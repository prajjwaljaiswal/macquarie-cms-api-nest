import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mqwarrants_login } from './mqwarrants_login.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { mqwarrants_login_history } from './mqwarrants_login_history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([mqwarrants_login, mqwarrants_login_history]),
  ],
  providers: [UserService],
  exports: [UserModule, UserService],
  controllers: [UserController],
})
export class UserModule {}
