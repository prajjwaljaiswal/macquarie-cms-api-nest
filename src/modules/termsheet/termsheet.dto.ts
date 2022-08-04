import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateTSdto {
  @IsString()
  ric: string;

  @IsString()
  symbol: string;

  @IsObject()
  pdf: Buffer;

  @IsString()
  file_name: string;
}

export class UpdateTSdto {
  @IsOptional()
  @IsObject()
  pdf: Buffer;

  @IsOptional()
  @IsString()
  file_name: string;

  @IsOptional()
  @IsInt()
  is_confirm: number;
}

export class GetTSdto {
  @IsString()
  ric: string;

  @IsString()
  symbol: string;
}
