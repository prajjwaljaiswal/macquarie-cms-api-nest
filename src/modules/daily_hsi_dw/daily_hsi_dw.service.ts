import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createDailySandpDto } from '../dailysandp/daily-sandp.dto';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { createDailyHsiDwDto, DailyHsiDwDto } from './daily_hsi_dw.dto';
import { DailyHsiDwEntity, DailyHsiDwImageEntity } from './daily_hsi_dw.entitiy';

@Injectable()
export class DailySandpService {
    constructor(
        @InjectRepository(DailyHsiDwEntity)
        private readonly DailyHsiDwEntity: Repository<DailyHsiDwEntity>,
        @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
        private readonly wsRepository: Repository<warrants_screener>,
    ){}

   async getTopPicks(){
        return await this.DailyHsiDwEntity
        .createQueryBuilder()
        .select([
           'id',
           'daily_hsi_status',
           'publish_date',
           'en_title',
           'thai_title',
           'en_short_content',
           'thai_short_content',
           'en_full_content',
           'thai_full_content'
          ])
          .orderBy('publish_date', 'DESC')
          .getRawMany();
    }

    async updateDailySP500(data: DailyHsiDwDto){
        const { id } = data;
        return await this.DailyHsiDwEntity
        .createQueryBuilder()
        .update(DailyHsiDwEntity)
        .set({
            ...data
        })
        .where("id = :id", { id })
        .execute();
    }



    async insert(data: createDailyHsiDwDto){
        return await this.DailyHsiDwEntity
        .createQueryBuilder()
        .insert()
        .values({
          ...data
            })
        .execute();
    }

    async getImage(id){
        return await this.DailyHsiDwEntity.find({
            select: ['id', 'image'],
            where: { id: id }
          });
    }


    async updateImage(data){
        const { id } = data;
        return await this.DailyHsiDwEntity
        .createQueryBuilder()
        .update(DailyHsiDwEntity)
        .set({
            ...data
        })
        .where("id = :id", {id})
        .execute();
    }
}


// fetch ADW
// select symbol, call_put, strike, ratio, IF(STRCMP(a.first_date,'0000-00-00'), a.first_date, NULL) as first_date, IF(STRCMP(a.last_date,'0000-00-00'), a.last_date, NULL) as last_date from mqwarrantscms.newly_listed a where symbol='ITD28C1602A'