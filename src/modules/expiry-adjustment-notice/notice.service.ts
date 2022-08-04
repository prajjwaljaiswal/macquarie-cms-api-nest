import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { createNoticeDto, updateNoticeDto } from './notice.dto';
import { NoticeEntity } from './notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly NoticeRepository: Repository<NoticeEntity>,
  ) {}

  async getPending(): Promise<NoticeEntity[]> {
    return await this.NoticeRepository.createQueryBuilder()
      .select(['id', 'headline', 'file_name', 'date', 'last_update_time'])
      .where('is_confirm = 0')
      .orderBy('last_update_time', 'DESC')
      .getRawMany();
  }

  async getConfirmed(): Promise<NoticeEntity[]> {
    return await this.NoticeRepository.createQueryBuilder()
      .select(['id', 'headline', 'file_name', 'date', 'last_update_time'])
      .where('is_confirm = 1')
      .orderBy('last_update_time', 'DESC')
      .getRawMany();
  }

  async getNoticeById(id: number): Promise<NoticeEntity> {
    return await this.NoticeRepository.findOne({
      select: ['id', 'date', 'headline', 'underlying', 'related_warrant'],
      where: { id: id },
    });
  }

  async createNotice(data: createNoticeDto): Promise<InsertResult> {
    return await this.NoticeRepository.createQueryBuilder()
      .insert()
      .values({
        ...data,
        pdf: Buffer.from(data.pdf),
        file_location: 1,
        is_confirm: 0,
        last_update_time: new Date(),
      })
      .execute();
  }

  async updateNotice(id: number, data: updateNoticeDto): Promise<UpdateResult> {
    if (data.pdf) {
      data.pdf = Buffer.from(data.pdf);
    } else {
      delete data.pdf;
      delete data.file_name;
    }
    return await this.NoticeRepository.createQueryBuilder()
      .update()
      .set({ ...data, last_update_time: new Date() })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteNotice(id: number) {
    return await this.NoticeRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
