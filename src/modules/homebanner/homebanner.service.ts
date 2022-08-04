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
    // console.log(await this.HomeBannerRespository.find({
    //   select: ['id', 'order'],
    //   order: { order: 'ASC' }}))
    return await this.HomeBannerRespository.find({
      select: ['id', 'order'],
      order: { order: 'ASC' },
    });
  }

  async getHomeBannerById(id: number): Promise<HomeBannerEntity> {
    // console.log("1111");
    return await this.HomeBannerRespository.findOne({
      select: ['link'],
      where: { id: id },
    });
  }

  async insertHomeBanner(data: CreateHomeBannerDto): Promise<InsertResult> {
    // eslint-disable-next-line prefer-const
    let arraybuffer = data.image ? Buffer.from(data.image) : null;
    return await this.HomeBannerRespository.createQueryBuilder()
      .insert()
      .values({ ...data, image: arraybuffer, last_update_time: new Date() })
      .execute();
  }

  async updateHomeBanner(id: number, data: UpdateHomeBannerDto,): Promise<UpdateResult> {
    data.image == null ? delete data.image : (data.image = Buffer.from(data.image));
    return await this.HomeBannerRespository.createQueryBuilder()
      .update()
      .set({ ...data, last_update_time: new Date() })
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
