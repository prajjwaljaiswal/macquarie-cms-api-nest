/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IFListEntity } from './index-future-list.entity';
import { IFWarrantsEntity } from './index-future-warrants.entity';
import { UpdateIFDto } from './index-future.dto';

@Injectable()
export class IFService {
  constructor(
    @InjectRepository(IFListEntity)
    private readonly IFListRepository: Repository<IFListEntity>,
    @InjectRepository(IFWarrantsEntity)
    private readonly IFWarrantsRepository: Repository<IFWarrantsEntity>,
  ) {}

  async getIFList(): Promise<IFListEntity[]> {
    return await this.IFListRepository.find({
      select: ['ric', 'dsply_name', 'underlying_ticker'],
      order: { dsply_name: 'ASC' },
    });
  }

  async getIFWarrants(): Promise<IFWarrantsEntity[]> {
    return await this.IFWarrantsRepository.find({
      select: [
        'wrnt_ric',
        'future_ric',
        'future_dsply_name',
        'dsply_nmll',
        'ticker',
      ],
      order: { wrnt_ric: 'ASC' },
    });
  }

  async updateIFWarrants(data: UpdateIFDto): Promise<UpdateResult> {
    const clearIF = await this.IFWarrantsRepository.createQueryBuilder()
      .update()
      .set({
        future_ric: '',
        future_dsply_name: '',
      })
      .where('future_ric = :future_ric', { future_ric: data.future_ric })
      .execute();
    return data.rics.length === 0
      ? clearIF
      : await this.IFWarrantsRepository.createQueryBuilder()
          .update()
          .set({
            future_ric: data.future_ric,
            future_dsply_name: data.future_dsply_name,
          })
          .where('wrnt_ric in (:...rics)', { rics: data.rics })
          .execute();
  }
}
