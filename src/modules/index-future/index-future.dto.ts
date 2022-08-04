import { IsString } from 'class-validator';

export class UpdateIFDto {
  @IsString({ each: true })
  rics: string[];

  @IsString()
  future_ric: string;

  @IsString()
  future_dsply_name: string;
}
