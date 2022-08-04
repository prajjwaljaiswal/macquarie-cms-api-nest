import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class HotListUpdateDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  category: string;
}
