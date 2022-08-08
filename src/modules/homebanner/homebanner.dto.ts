/* eslint-disable prettier/prettier */
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateHomeBannerDto {

  @IsNumber()
  id: number;
  
  @IsString()
  desktop_link: string;

  @IsOptional()
  @IsString()
  mobile_link: string;

  @IsOptional()
  @IsObject()
  desktop_image: Buffer;

  
  @IsOptional()
  @IsObject()
  mobile_image: Buffer;
}

export class UpdateHomeBannerDto {
  @IsString()
  desktop_link: string;

  @IsOptional()
  @IsString()
  mobile_link: string;

  @IsOptional()
  @IsObject()
  desktop_image: Buffer;

  
  @IsOptional()
  @IsObject()
  mobile_image: Buffer;


}
