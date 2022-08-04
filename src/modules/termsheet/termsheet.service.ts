import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateTSdto, UpdateTSdto } from './termsheet.dto';
import { TermsheetEntity } from './termsheet.entity';

@Injectable()
export class TermsheetService {
  constructor(
    @InjectRepository(TermsheetEntity)
    private readonly TermsheetRepository: Repository<TermsheetEntity>,
  ) {}

  async getPending(): Promise<TermsheetEntity[]> {
    return await this.TermsheetRepository.createQueryBuilder()
      .select(['ric', 'file_name', 'symbol', 'last_update_time'])
      .addSelect('ROW_NUMBER() OVER(ORDER BY last_update_time) AS id')
      .where('is_confirm = 0')
      .orderBy('last_update_time', 'DESC')
      .getRawMany();
  }

  async getConfirmed(): Promise<TermsheetEntity[]> {
    return await this.TermsheetRepository.createQueryBuilder()
      .select(['ric', 'file_name', 'symbol', 'last_update_time'])
      .addSelect('ROW_NUMBER() OVER(ORDER BY last_update_time) AS id')
      .where('is_confirm = 1')
      .orderBy('last_update_time', 'DESC')
      .getRawMany();
  }

  async createTS(data: CreateTSdto): Promise<InsertResult> {
    return await this.TermsheetRepository.createQueryBuilder()
      .insert()
      .values({
        ...data,
        last_update_time: () => 'now()',
        is_confirm: 0,
        pdf: Buffer.from(data.pdf),
      })
      .orUpdate({ overwrite: ['ric'] })
      .execute();
  }

  async updateTS(ticker: string, data: UpdateTSdto): Promise<UpdateResult> {
    if (data.pdf) {
      data.pdf = Buffer.from(data.pdf);
    }
    return await this.TermsheetRepository.createQueryBuilder()
      .update()
      .set(data)
      .where('symbol = :ticker', { ticker: ticker })
      .execute();
  }

  async deleteTS(ticker: string): Promise<DeleteResult> {
    return await this.TermsheetRepository.createQueryBuilder()
      .delete()
      .where('symbol = :ticker', { ticker: ticker })
      .execute();
  }
}
