import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdatedwInventoryDto {
    @IsString()
    symbol: string;

    @IsOptional()
    @IsString()
    ric: string;

}
