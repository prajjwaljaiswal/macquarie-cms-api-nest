import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMMBDto {
  @IsInt()
  daily_highlight_status: number;

  @IsString()
  publish_date: string;

  @IsString()
  en_title: string;

  @IsOptional()
  @IsString()
  thai_title: string;

  @IsString()
  en_short_content: string;

  @IsOptional()
  @IsString()
  thai_short_content: string;

  @IsString()
  en_full_content: string;

  @IsOptional()
  @IsString()
  thai_full_content: string;
}

export class UpdateMMBDto {
  @IsInt()
  daily_highlight_status: number;

  @IsString()
  publish_date: string;

  @IsString()
  en_title: string;

  @IsOptional()
  @IsString()
  thai_title: string;

  @IsString()
  en_short_content: string;

  @IsOptional()
  @IsString()
  thai_short_content: string;

  @IsString()
  en_full_content: string;

  @IsOptional()
  @IsString()
  thai_full_content: string;
}
