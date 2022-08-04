/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { PhotoGalleryEntity } from './photo-gallery.entity';
import {
  CreatePhotoGallerydto,
  DeletePhotoGallerydto,
} from './photo-gallery.dto';

@Injectable()
export class PhotoGalleryService {
  constructor(
    @InjectRepository(PhotoGalleryEntity)
    private readonly PhotoGalleryRepository: Repository<PhotoGalleryEntity>,
  ) {}

  async getGalleryById(
    id: number,
    page: number,
  ): Promise<PhotoGalleryEntity[]> {
    return await this.PhotoGalleryRepository.find({
      select: ['id'],
      where: { album_id: id },
      take: 6,
      skip: 6 * (page - 1),
    });
  }

  async insertPhotoGallery(data: CreatePhotoGallerydto): Promise<InsertResult> {
    if (data) {
      const temp = data.photo.map((file: Buffer) => {
        return {
          album_id: data.album_id,
          last_update_time: new Date(),
          photo: Buffer.from(file),
        };
      });
      return await this.PhotoGalleryRepository.createQueryBuilder()
        .insert()
        .values(temp)
        .execute();
    } else {
      throw new Error();
    }
  }

  async deletePhotoGallery(data: DeletePhotoGallerydto): Promise<DeleteResult> {
    return await this.PhotoGalleryRepository.createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids: data.ids })
      .execute();
  }
}
