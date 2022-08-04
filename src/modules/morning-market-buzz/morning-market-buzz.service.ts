import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, UpdateResult, DeleteResult, Repository } from 'typeorm';
import { MMBEntity } from './morning-market-buzz.entity';
import { CreateMMBDto, UpdateMMBDto } from './morning-market-buzz.dto';

@Injectable()
export class MMBService {
  constructor(
    @InjectRepository(MMBEntity)
    private readonly MMBRepository: Repository<MMBEntity>,
  ) {}

  async getMMBList(): Promise<MMBEntity[]> {
    return await this.MMBRepository.find({
      select: ['publish_date', 'daily_highlight_status', 'en_title', 'id'],
      order: { publish_date: 'DESC', id: 'DESC' },
    });
  }

  async getMMBById(id: number): Promise<MMBEntity> {
    return await this.MMBRepository.findOne(id);
  }

  public async getLatestTitle(): Promise<MMBEntity> {
    return await this.MMBRepository.findOne({
      select: ['id','en_title','en_short_content'],
      where: { daily_highlight_status: 1 },
      order: { publish_date: 'DESC' },
    });
  }

  async createMMB(data: CreateMMBDto): Promise<InsertResult> {
    return await this.MMBRepository.createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  async updateMMB(data: UpdateMMBDto, id: number): Promise<UpdateResult> {
    return await this.MMBRepository.createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteMMB(id: number): Promise<DeleteResult> {
    return await this.MMBRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
