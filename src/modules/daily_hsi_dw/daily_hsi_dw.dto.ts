/* eslint-disable prettier/prettier */
import { IsDate, isNumber, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class DailyHsiDwDto {

  @IsNumber()
  id: number;

  @IsNumber()
  daily_hsi_status: number;

  @IsString()
  publish_date: Date;

  @IsString()
  en_title: string;

  @IsString()
  thai_title: string;

  @IsString()
  en_short_content: string;

  @IsString()
  thai_short_content: string

  
  @IsString()
  en_full_content: string

  @IsString()
  thai_full_content: string
}



export class createDailyHsiDwDto {
  
  @IsNumber()
  daily_hsi_status: number;

  @IsString()
  publish_date: Date;

  @IsString()
  en_title: string;

  @IsString()
  thai_title: string;

  @IsString()
  en_short_content: string;

  @IsString()
  thai_short_content: string

  
  @IsString()
  en_full_content: string

  @IsString()
  thai_full_content: string
}

export class DailyHsiDwImageDto{
    @IsNumber()
    id: number;
}

