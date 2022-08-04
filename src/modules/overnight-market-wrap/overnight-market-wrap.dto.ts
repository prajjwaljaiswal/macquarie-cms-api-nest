import { IsOptional, IsString } from 'class-validator';

export class CreateOMWDto {
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

export class UpdateOMWDto {
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
