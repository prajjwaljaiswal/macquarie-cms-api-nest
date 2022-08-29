/* eslint-disable prettier/prettier */
import { IsDate, isNumber, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { isArrayBuffer } from 'util/types';

export class DailySet50AecsDto {

  @IsNumber()
  id: number;

  @IsNumber()
  daily_highlight_status: number;

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



export class createDailySet50AecsDto {
  
  @IsNumber()
  daily_sp500_status: number;

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

  @IsOptional()
  image: Buffer;
}

export class DailySet50AecsImageDto{
    @IsNumber()
    id: number;
    
    @IsOptional()
    image: Buffer;
}

