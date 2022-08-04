import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject } from 'class-validator';

export class CreatePhotoGallerydto {
  @IsNumber()
  album_id: number;

  @IsArray()
  @IsObject({ each: true })
  photo: Buffer[];
}

export class DeletePhotoGallerydto {
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
