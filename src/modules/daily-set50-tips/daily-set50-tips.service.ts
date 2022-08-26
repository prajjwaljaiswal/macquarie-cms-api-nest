import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { createDailySet50TipsDto } from './all_foreign_index.dto';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { createDailySet50TipsDto, DailySet50TipsDto } from './daily-set50-tips.dto';
import { DailySet50TipsEntity, DailySet50TipsImageEntity } from './daily-set50-tips.entitiy';

@Injectable()
export class DailySet50TipsService {
    constructor(
        @InjectRepository(DailySet50TipsEntity)
        private readonly DailySet50TipsEntity: Repository<DailySet50TipsEntity>,
        @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
        private readonly wsRepository: Repository<warrants_screener>,
    ){}

   async getTopPicks(){
        return await this.DailySet50TipsEntity
        .createQueryBuilder()
        .select([
           'id',
           'dw_tips_status',
           'publish_date',
           'en_title',
           'thai_title',
           'en_full_content',
           'thai_full_content'
          ])
          .orderBy('publish_date', 'DESC')
          .getRawMany();
    }


    async DailySet50TipsById(id){
        return await this.DailySet50TipsEntity
        .find({id});
    }

    async updateDailySP500(data: DailySet50TipsDto, id){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.DailySet50TipsEntity
        .createQueryBuilder()
        .update(DailySet50TipsEntity)
        .set({
            ...data, image: arraybuffer
        })
        .where("id = :id", { id })
        .execute();
    }



    async insert(data: createDailySet50TipsDto){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.DailySet50TipsEntity
        .createQueryBuilder()
        .insert()
        .values({
          ...data, image: arraybuffer
            })
        .execute();
    }

    async getImage(id){
        return await this.DailySet50TipsEntity.find({
            select: ['id', 'image'],
            where: { id: id }
          });
    }


    async updateImage(data){
        const { id } = data;
        return await this.DailySet50TipsEntity
        .createQueryBuilder()
        .update(DailySet50TipsEntity)
        .set({
            ...data
        })
        .where("id = :id", {id})
        .execute();
    }

    async deleteDailySet50Tips(id: number) {
        return await this.DailySet50TipsEntity.createQueryBuilder()
          .delete()
          .where('id = :id', { id: id })
          .execute();
      }
}


// fetch ADW
// select symbol, call_put, strike, ratio, IF(STRCMP(a.first_date,'0000-00-00'), a.first_date, NULL) as first_date, IF(STRCMP(a.last_date,'0000-00-00'), a.last_date, NULL) as last_date from mqwarrantscms.newly_listed a where symbol='ITD28C1602A'