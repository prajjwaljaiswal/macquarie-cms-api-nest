import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {    
    var ip = req.body.ipv4;
    this.authService.ipcheck(ip);
    return this.authService.login(req.user);
  }

  @Post('checkip')
  async resetPassword(@Body() body) {
    return this.authService.ipcheck(body.ipv4);
  }
}
