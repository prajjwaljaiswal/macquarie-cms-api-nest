/* eslint-disable prettier/prettier */
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class PowerSearchDTO {
  @IsOptional()
  limit?: string;

  @IsOptional()
  skip?: string;

  @IsOptional()
  ric?: string;

  @IsOptional()
  @IsNotEmpty()
  ticker?: string;

  @IsOptional()
  @IsNotEmpty()
  dsply_name?: string;
}
