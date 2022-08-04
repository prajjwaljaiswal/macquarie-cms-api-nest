/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class TodayTopPicksDto {
  @IsNumber()
  id: number;

  @IsString()
  symbol: string;

  @IsNumber()
  top_pick_order: number;

  @IsString()
  top_pick_status: string;

  @IsString()
  time_scale: string;

  @IsString()
  update_date: string;

  @IsString()
  en_content: string;

  @IsString()
  thai_content: string;
}


export class CreateTopPicksDto {
          @IsString()
          symbol: string;

          @IsNumber()
          top_pick_order: number;

          @IsString()
          top_pick_status: string;

          @IsString()
          time_scale: string;

          @IsString()
          update_date: string;

          @IsString()
          en_content: string;

          @IsString()
          thai_content: string;
}




