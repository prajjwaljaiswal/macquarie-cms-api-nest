import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { TodaysTopPicksEntity } from './todays-top-picks.entitiy';
import { CreateTopPicksDto } from './top-picks.dto';

@Injectable()
export class TodaysTopPicksService {
    constructor(
        @InjectRepository(TodaysTopPicksEntity)
        private readonly TodaysTopPicksEntity: Repository<TodaysTopPicksEntity>,
        @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
        private readonly wsRepository: Repository<warrants_screener>,
    ){}

   async getTopPicks(){
        return await this.TodaysTopPicksEntity
        .find({
            order: {
            id: "DESC"
        }});
        
    }

    async getTopPicksById(id){
        return await this.TodaysTopPicksEntity
        .find({id});
    }

    async createTopPicks(data: CreateTopPicksDto){

        return await this.TodaysTopPicksEntity.createQueryBuilder()
      .insert()
      .values({
        ...data
          })
      .execute();

    }

    async updateTopPicks(TodayTopPicksDto){
        const {id, symbol, top_pick_status, time_scale, top_pick_order, update_date, en_content, thai_content } = TodayTopPicksDto;
        return await this.TodaysTopPicksEntity
        .createQueryBuilder()
        .update(TodaysTopPicksEntity)
        .set({symbol,
        top_pick_status,
        time_scale,
        top_pick_order,
        update_date,
        en_content,
        thai_content
        })
        .where("id = :id", { id })
        .execute();
    }


    async deleteTopPicks(id: number) {
        return await this.TodaysTopPicksEntity.createQueryBuilder()
          .delete()
          .where('id = :id', { id: id })
          .execute();
      }
}
