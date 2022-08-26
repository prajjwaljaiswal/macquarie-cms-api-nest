/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateHomeBannerDto, UpdateHomeBannerDto } from './homebanner.dto';
import { HomeBannerEntity } from './homebanner.entity';

@Injectable()
export class HomeBannerService {
  constructor(
    @InjectRepository(HomeBannerEntity)
    private readonly HomeBannerRespository: Repository<HomeBannerEntity>,
  ) { }

  async getHomeBannerList(): Promise<HomeBannerEntity[]> {
    return await this.HomeBannerRespository.find({
      select: ['id', 'desktop_link'],
      order: { id: 'ASC' },
    });
  }

  async getHomeBannerById(id: number): Promise<HomeBannerEntity> {
    // console.log("1111");
    return await this.HomeBannerRespository.findOne({
      select: ['desktop_link'],
      where: { id: id },
    });
  }

  async insertHomeBanner(data: CreateHomeBannerDto): Promise<InsertResult> {
    // eslint-disable-next-line prefer-const
    let arraybuffer = data.desktop_link ? Buffer.from(data.desktop_link) : null;
    return await this.HomeBannerRespository.createQueryBuilder()
      .insert()
      .values({ ...data, desktop_image: arraybuffer })
      .execute();
  }

  async updateHomeBanner(id: number, data: UpdateHomeBannerDto,) {
    const arraybufferDesktop = (data.desktop_image) ? Buffer.from(data.desktop_image) : null;
    const arraybufferMobile =(data.mobile_image) ? Buffer.from(data.mobile_image) : null;
    return await this.HomeBannerRespository.createQueryBuilder()
      .update()
      .set({ ...data, desktop_image: arraybufferDesktop, mobile_image: arraybufferMobile })
      .where(' id = :id', { id: id })
      .execute();
  }

  async deleteHomeBanner(id: number): Promise<DeleteResult> {
    return await this.HomeBannerRespository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
