/* eslint-disable prettier/prettier */
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateHomeBannerDto {
  @IsNumber()
  order: number;

  @IsString()
  link: string;

  @IsOptional()
  @IsObject()
  image: Buffer;
}

export class UpdateHomeBannerDto {
  @IsNumber()
  order: number;

  @IsString()
  link: string;

  @IsOptional()
  @IsObject()
  image: Buffer;

}
