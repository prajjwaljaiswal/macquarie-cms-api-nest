/* eslint-disable prettier/prettier */
import { IsDate, isNumber, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class DailySet50TipsDto {

  @IsNumber()
  dw_tips_status: number;

  @IsString()
  publish_date: Date;

  @IsString()
  en_title: string;

  @IsString()
  thai_title: string;
  
  @IsString()
  en_full_content: string

  @IsString()
  thai_full_content: string

  @IsOptional()
  image: Buffer;
}



export class createDailySet50TipsDto {
  
  @IsNumber()
  dw_tips_status: number;

  @IsString()
  publish_date: Date;

  @IsString()
  en_title: string;

  @IsString()
  thai_title: string;
  
  @IsString()
  en_full_content: string

  @IsString()
  thai_full_content: string

  @IsOptional()
  image: Buffer;
}

export class DailySet50TipsImageDto{
    @IsNumber()
    id: number;
}

