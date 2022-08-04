import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateSeminardto {
  @IsString()
  seminar_date: string;

  @IsString()
  en_seminar_time: string;

  @IsOptional()
  @IsString()
  th_seminar_time: string;

  @IsNumber()
  sign_up_limit: number;

  @IsString()
  seminar_status: string;

  @IsString()
  en_title: string;

  @IsOptional()
  @IsString()
  th_title: string;

  @IsString()
  en_partner: string;

  @IsOptional()
  @IsString()
  th_partner: string;

  @IsString()
  en_venue: string;

  @IsOptional()
  @IsString()
  th_venue: string;

  @IsString()
  en_introduce_content: string;

  @IsOptional()
  @IsString()
  th_introduce_content: string;

  @IsOptional()
  @IsObject()
  en_poster: Buffer;

  @IsOptional()
  @IsObject()
  th_poster: Buffer;

  @IsString()
  registration_link: string;

  @IsString()
  webinar: string;

  @IsString()
  recorded: string;
}

export class UpdateSeminardto {
  @IsString()
  seminar_date: string;

  @IsString()
  en_seminar_time: string;

  @IsOptional()
  @IsString()
  th_seminar_time: string;

  @IsNumber()
  sign_up_limit: number;

  @IsString()
  seminar_status: string;

  @IsString()
  en_title: string;

  @IsOptional()
  @IsString()
  th_title: string;

  @IsString()
  en_partner: string;

  @IsOptional()
  @IsString()
  th_partner: string;

  @IsString()
  en_venue: string;

  @IsOptional()
  @IsString()
  th_venue: string;

  @IsString()
  en_introduce_content: string;

  @IsOptional()
  @IsString()
  th_introduce_content: string;

  @IsOptional()
  @IsObject()
  en_poster: Buffer;

  @IsOptional()
  @IsObject()
  th_poster: Buffer;

  @IsString()
  registration_link: string;

  @IsString()
  webinar: string;

  @IsString()
  recorded: string;
}
