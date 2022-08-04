import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class createNoticeDto {
  @IsString()
  date: string;

  @IsString()
  headline: string;

  @IsString()
  underlying: string;

  @IsString()
  related_warrant: string;

  @IsString()
  file_name: string;

  @IsObject()
  pdf: Buffer;
}

export class updateNoticeDto {
  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  headline: string;

  @IsOptional()
  @IsString()
  underlying: string;

  @IsOptional()
  @IsString()
  related_warrant: string;

  @IsOptional()
  @IsString()
  file_name: string;

  @IsOptional()
  @IsObject()
  pdf: Buffer;

  @IsOptional()
  @IsInt()
  is_confirm: number;
}
