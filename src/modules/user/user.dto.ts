import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ResetPassworddto {
  @IsString()
  login_id: string;

  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}
