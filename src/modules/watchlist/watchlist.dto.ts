import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class WatchListDto {
  @IsOptional()
  @IsString()
  ric: string;

  @IsOptional()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  getRic: string;
}
