import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateOMWDto, UpdateOMWDto } from './overnight-market-wrap.dto';
import { OMWEntity } from './overnight-market-wrap.entity';

@Injectable()
export class OMWService {
  constructor(
    @InjectRepository(OMWEntity)
    private readonly OMWRepository: Repository<OMWEntity>,
  ) {}

  async getOMWList(): Promise<OMWEntity[]> {
    return await this.OMWRepository.find({
      select: ['publish_date', 'en_title', 'id'],

      order: { publish_date: 'DESC', id: 'DESC' },
    });
  }

  async getOMWById(id: number): Promise<OMWEntity> {
    return await this.OMWRepository.findOne(id);
  }

  public async getLatestTitle(): Promise<OMWEntity> {
    return await this.OMWRepository.findOne({
      select: ['id','en_title','en_short_content'],
      order: { publish_date: 'DESC' },
    });
  }

  async createOMW(data: CreateOMWDto): Promise<InsertResult> {
    return await this.OMWRepository.createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  async updateOMW(data: UpdateOMWDto, id: number): Promise<UpdateResult> {
    return await this.OMWRepository.createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteOMW(id: number): Promise<DeleteResult> {
    return await this.OMWRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
