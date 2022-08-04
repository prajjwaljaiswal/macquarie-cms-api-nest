/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateAdBannerDto, UpdateAdBannerDto } from './fast-track.dto';
import { FastTrackEntity } from './fast-track.entity';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Injectable()
export class FastTrackService {
  constructor(
    @InjectRepository(FastTrackEntity)
    private readonly FastTrackRespository: Repository<FastTrackEntity>,
    @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
    private readonly wsRepository: Repository<warrants_screener>,
  ) {}
  
async getAdBannerList(): Promise<FastTrackEntity[]> {

    return await this.wsRepository
    .createQueryBuilder('w')
    .leftJoinAndSelect(FastTrackEntity, 'dw', 'w.ticker = dw.ticker')
    .select([
      'w.ticker as ticker',
      'w.dsply_name as name',
      'w.type as type',
      'w.underlying_ric as underlying_ric'
    ])
    .addSelect("IFNULL(dw.status,'0')", "status")
    .andWhere('issuer_name = "Macquarie Securities Thailand Ltd"')
    .andWhere('exchange_code = "SET"')
    .andWhere('maturity >= CURDATE()')
    .orderBy('ticker', 'ASC')
    .getRawMany();
   
}
  
async updateFastTrack(data: any ): Promise<UpdateResult> {
    var status_false = []
    var status_ture = []
    await data.data.map(async (element)=>{
        if(element.status == 1){
          status_ture.push(element.ticker)
        }else{
          status_false.push(element.ticker)
        }
    })
    var d = await this.FastTrackRespository.createQueryBuilder().select(['ticker']).where('ticker in (:...tickers)', { tickers: status_ture }).getRawMany();
    status_ture.map(async el=>{
      if( d.map(x => x.ticker).indexOf(el) == -1){
        await this.FastTrackRespository.createQueryBuilder().insert().values({ticker:el,status:"1"}).execute();
      }
    })
    await this.FastTrackRespository.createQueryBuilder()
      .update()
      .set({ status:"1"})
      .where('ticker in (:...tickers)', { tickers: status_ture })
      .execute();

    return await this.FastTrackRespository.createQueryBuilder()
      .update()
      .set({ status:"0"})
      .where('ticker in (:...tickers)', { tickers: status_false })
      .execute();
    
  }

}
