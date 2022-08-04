import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateNewsletterdto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  img_id: number;

  @IsString()
  img_link: string;

  @IsString()
  option: string;

  @IsInt()
  news_img_id: number;

  @IsString()
  news_img_link: string;

  @IsOptional()
  @IsObject()
  tipsfile: Buffer;

  @IsOptional()
  @IsObject()
  newsfile: Buffer;
}
