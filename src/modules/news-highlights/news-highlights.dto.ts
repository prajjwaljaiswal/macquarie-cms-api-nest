/* eslint-disable prettier/prettier */
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateAdBannerDto {
  @IsNumber()
  order: number;

  @IsString()
  link: string;

  @IsOptional()
  @IsObject()
  image: Buffer;

  @IsNumber()
  redirect_type: number;
}

export class UpdateAdBannerDto {
  
  @IsString()
  ticker: string;
  @IsString()
  status: string;

 
}
