import {
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResetPassworddto } from './user.dto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('password')
  async resetPassword(@Body() body: ResetPassworddto) {
    return this.UserService.ResetPassword(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((err) => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: err.message,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
