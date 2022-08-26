/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { dailyMarketAnalysisListEntity } from './daily-market-analysis.entity';
import { dailyMarketAnalysisWarrantsEntity } from './daily-market-analysis-warrants.entity';
import { UpdatedailyMarketAnalysisDto } from './daily-market-analysis.dto';

@Injectable()
export class dailyMarketAnalysisService {
  constructor(
    @InjectRepository(dailyMarketAnalysisListEntity)
    private readonly dailyMarketAnalysisListRepository: Repository<dailyMarketAnalysisListEntity>,
    @InjectRepository(dailyMarketAnalysisWarrantsEntity)
    private readonly dailyMarketAnalysisWarrantsRepository: Repository<dailyMarketAnalysisWarrantsEntity>,
  ) {}

  async getdwList(): Promise<dailyMarketAnalysisListEntity[]> {
    return await this.dailyMarketAnalysisListRepository.find({
      order: { id: 'DESC' },
    });
  }

  async getdwListById(id){
    return await this.dailyMarketAnalysisListRepository.find({
        where: { id: id }
      });
    }


  async insertdwListById(data){
    data.image = data.image ? Buffer.from(data.image) : null;
    return await this.dailyMarketAnalysisListRepository
    .createQueryBuilder()
    .insert()
    .values({
      ...data, image: data.image
        })
    .execute();
  }


  async deletedwListByid(id: number) {
    return await this.dailyMarketAnalysisListRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }

  async updatedwListById(id, data){
        data.image = data.image ? Buffer.from(data.image) : null;
        return await this.dailyMarketAnalysisListRepository
        .createQueryBuilder()
        .update(dailyMarketAnalysisListEntity)
        .set({
          ...data,
          image: data.image
        })
        .where("id = :id", {id})
        .execute();
    }

  // async updatedailyMarketAnalysisWarrants(data: UpdatedailyMarketAnalysisDto): Promise<UpdateResult> {
  //   const cleardailyMarketAnalysis = await this.dailyMarketAnalysisWarrantsRepository.createQueryBuilder()
  //     .update()
  //     .set({
  //       future_ric: '',
  //       future_dsply_name: '',
  //     })
  //     .where('future_ric = :future_ric', { future_ric: data.future_ric })
  //     .execute();
  //   return data.rics.length === 0
  //     ? cleardailyMarketAnalysis
  //     : await this.dailyMarketAnalysisWarrantsRepository.createQueryBuilder()
  //         .update()
  //         .set({
  //           future_ric: data.future_ric,
  //           future_dsply_name: data.future_dsply_name,
  //         })
  //         .where('wrnt_ric in (:...rics)', { rics: data.rics })
  //         .execute();
  // }
}
