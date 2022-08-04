/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateAdBannerDto, UpdateAdBannerDto } from './adbanner.dto';
import { AdBannerEntity } from './adbanner.entity';

@Injectable()
export class AdBannerService {
  constructor(
    @InjectRepository(AdBannerEntity)
    private readonly AdBannerRespository: Repository<AdBannerEntity>,
  ) {}

  async getAdBannerList(): Promise<AdBannerEntity[]> {
    return await this.AdBannerRespository.find({
      select: ['id', 'order'],
      order: { order: 'ASC' },
    });
  }

  async getAdBannerById(id: number): Promise<AdBannerEntity> {
    return await this.AdBannerRespository.findOne({
      select: ['link', 'redirect_type'],
      where: { id: id },
    });
  }

  async insertAdBanner(data: CreateAdBannerDto): Promise<InsertResult> {
    // eslint-disable-next-line prefer-const
    let arraybuffer = data.image ? Buffer.from(data.image) : null;
    return await this.AdBannerRespository.createQueryBuilder()
      .insert()
      .values({ ...data, image: arraybuffer, last_update_time: new Date() })
      .execute();
  }

  async updateAdBanner(
    id: number,
    data: UpdateAdBannerDto,
  ): Promise<UpdateResult> {
    data.image == null ? delete data.image : (data.image = Buffer.from(data.image));
    return await this.AdBannerRespository.createQueryBuilder()
      .update()
      .set({ ...data, last_update_time: new Date() })
      .where(' id = :id', { id: id })
      .execute();
  }

  async deleteAdBanner(id: number): Promise<DeleteResult> {
    return await this.AdBannerRespository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
