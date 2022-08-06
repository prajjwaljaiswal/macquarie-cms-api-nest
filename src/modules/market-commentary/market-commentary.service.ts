import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateMarketComentryDto, UpdateMarketComentryDto } from './market-commentary.dto';
import { MarketComentryEntity } from './market-commentary.entity';

@Injectable()
export class MarketComentryService {
  constructor(
    @InjectRepository(MarketComentryEntity)
    private readonly MarketComentryRepository: Repository<MarketComentryEntity>,
  ) {}

  async getMarketComentryList(): Promise<MarketComentryEntity[]> {
    return await this.MarketComentryRepository.find({
      select: ['publish_date', 'en_title', 'id'],

      order: { publish_date: 'DESC', id: 'DESC' },
    });
  }

  async getMarketComentryById(id: number): Promise<MarketComentryEntity> {
    return await this.MarketComentryRepository.findOne(id);
  }

  public async getLatestTitle(): Promise<MarketComentryEntity> {
    return await this.MarketComentryRepository.findOne({
      select: ['id','en_title','en_short_content'],
      order: { publish_date: 'DESC' },
    });
  }

  async createMarketComentry(data: CreateMarketComentryDto): Promise<InsertResult> {
    return await this.MarketComentryRepository.createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  async updateMarketComentry(data: UpdateMarketComentryDto, id: number): Promise<UpdateResult> {
    return await this.MarketComentryRepository.createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteMarketComentry(id: number): Promise<DeleteResult> {
    return await this.MarketComentryRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
