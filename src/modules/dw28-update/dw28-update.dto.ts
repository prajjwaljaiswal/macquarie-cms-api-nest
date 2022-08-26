import { IsArray, IsObject, IsString } from 'class-validator';

export class Updatedw28updateDto {
    @IsString()
    en_title: string;

    @IsString()
    thai_title: string;
    
    @IsString()
    publish_date: string;

 
    @IsObject({ each: true })
    image: Buffer;

}