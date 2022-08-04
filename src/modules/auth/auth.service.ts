/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { reset_time, auth, auth_time, try_password, password, ...result } =
        user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.login_id, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      expire : user.expire
    };
  }

  ipcheck(ip: any) {
    return true;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var propertiesReader = require('properties-reader');
    var properties = propertiesReader('./src/whitelist.properties');
    var list:string = properties.get('list');
    var range:string = properties.get('range');
    var check_ip = false;
    var ip_long = 0;
    var ipAddressInArray = ip.split(".");
    // console.log(ipAddressInArray);
    if(ipAddressInArray.length==4){
        var result = 0;
        for (var j = 0; j < ipAddressInArray.length; j++) {            
            var power = 3 - j;
            var ip_num = Number(ipAddressInArray[j]);
            result += ip_num * Math.pow(256, power);
        }
        ip_long = result;
    }
    var whitelist = list.split(",");
    var whitelistrange = range.split(",")
    for(var i=0;i<whitelist.length;i++){
      if(whitelist[i]==ip){
        check_ip=true;
        break;
      }
    }
    if(!check_ip)
      for(var i=0;i<whitelistrange.length;i++){
        var ipAddressRangeInArray = whitelistrange[i].split("/");
        var listipAddressInArray = ipAddressRangeInArray[0].split(".");
            var result = 0;
            for (var j = 0; j < listipAddressInArray.length; j++) {            
                var power = 3 - j;
                var ip_num = Number(listipAddressInArray[j]);
                result += ip_num * Math.pow(256, power);
            }
            var ranges = Math.pow(2, (32-Number(ipAddressRangeInArray[1]))) + result;
            if(ip_long>=result && ip_long<ranges){
                check_ip = true;
                break; 
            }
      }
    if(!check_ip){
      throw new HttpException(
        {
          MESSAGE: "false",
          STATUSCODE: HttpStatus.NOT_IMPLEMENTED,
        },
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    return check_ip;
  }
}
