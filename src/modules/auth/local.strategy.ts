import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException, HttpStatus, } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    var moment = require("moment-timezone");
    var TIMESTAMP_FORMAT = "YYYYMMDDHHmmss";
    var TIMESTAMP_TIMEZONE = "GMT";
    let daydiff = null;
    if (!user) {
      // throw new UnauthorizedException();
      throw new HttpException(
        {
          message: 'Please Login again with correct credentials.',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if(user.update_time){
      daydiff = moment().diff(moment.tz(moment(user.update_time, TIMESTAMP_FORMAT), TIMESTAMP_TIMEZONE), "days");
      if(daydiff>60){
        throw new HttpException(
          {
            message: 'Account Expired.',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      user.expire = 60 - daydiff;
    }
    return user;
  }
}
