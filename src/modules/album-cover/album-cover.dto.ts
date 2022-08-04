import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateAlbumdto {
  @IsString()
  date: String;

  @IsNumber()
  status: number;

  @IsString()
  en_title: string;

  @IsOptional()
  @IsString()
  th_title: string;

  @IsString()
  en_description: string;

  @IsOptional()
  @IsString()
  th_description: string;

  @IsOptional()
  @IsObject()
  cover: Buffer;
}
