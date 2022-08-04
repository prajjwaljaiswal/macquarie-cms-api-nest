import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { AlbumCoverEntity } from './album-cover.entity';
import { PhotoGalleryEntity } from '../photo-gallery/photo-gallery.entity';
import { CreateAlbumdto } from './album-cover.dto';

@Injectable()
export class AlbumCoverService {
  constructor(
    @InjectRepository(AlbumCoverEntity)
    private readonly AlbumCoverReposity: Repository<AlbumCoverEntity>,
  ) {}

  async getAlbumList(): Promise<AlbumCoverEntity[]> {
    return await this.AlbumCoverReposity.createQueryBuilder('album')
      .leftJoinAndSelect(
        (subquery) =>
          subquery
            .select(['album_id', 'COUNT(album_id) AS count'])
            .from(PhotoGalleryEntity, 'photo')
            .groupBy('album_id'),
        'b',
        'b.album_id = album.id',
      )
      .select(['id', 'status', 'en_title', 'last_update_time', 'count'])
      .getRawMany();
  }

  async getEnabledAlbumList(): Promise<AlbumCoverEntity[]> {
    return await this.AlbumCoverReposity.createQueryBuilder('album')
      .leftJoinAndSelect(
        (subquery) =>
          subquery
            .select(['album_id', 'COUNT(album_id) AS count'])
            .from(PhotoGalleryEntity, 'photo')
            .groupBy('album_id'),
        'b',
        'b.album_id = album.id',
      )
      .where('album.status = 1')
      .select(['id', 'en_title', 'count'])
      .getRawMany();
  }

  async getAlbumById(id: number): Promise<AlbumCoverEntity> {
    return await this.AlbumCoverReposity.findOne({
      select: ['id', 'en_title', 'en_description', 'status', 'date'],
      where: { id: id },
    });
  }

  async createAlbum(data: CreateAlbumdto): Promise<InsertResult> {
    if (!data.cover) {
      data.cover = Buffer.alloc(0);
    } else {
      data.cover = Buffer.from(data.cover);
    }
    return await this.AlbumCoverReposity.createQueryBuilder()
      .insert()
      .values({
        ...data,
        last_update_time: new Date(),
      })
      .execute();
  }

  async updateAlbum(id: number, data: CreateAlbumdto): Promise<UpdateResult> {
    if (!data.cover) {
      delete data.cover;
    } else {
      data.cover = Buffer.from(data.cover);
    }
    return await this.AlbumCoverReposity.createQueryBuilder()
      .update()
      .set({
        ...data,
        last_update_time: new Date(),
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteAlbum(id: number): Promise<DeleteResult> {
    return await this.AlbumCoverReposity.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
