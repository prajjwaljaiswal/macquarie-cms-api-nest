import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { createDailySandpDto, DailySandpDto, DailySandpImageDto } from './daily-sandp.dto';
import { DailySandpEntity, DailySandpImageEntity } from './daily-sandp.entitiy';

@Injectable()
export class DailySandpService {
    constructor(
        @InjectRepository(DailySandpEntity)
        private readonly DailySandpEntity: Repository<DailySandpEntity>,
        @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
        private readonly wsRepository: Repository<warrants_screener>,
    ){}

   async getTopPicks(){
        return await this.DailySandpEntity
        .createQueryBuilder()
        .select([
           'id',
           'daily_sp500_status',
           'publish_date',
           'en_title',
           'thai_title',
           'en_short_content',
           'thai_short_content',
           'en_full_content',
           'thai_full_content'
          ])
          .orderBy('publish_date', 'ASC')
          .getRawMany();
    }


    async getTopPicksById(id){
        return await this.DailySandpEntity
        .find({id});
    }


    async updateDailySP500(data: DailySandpDto){
        const { id } = data;
        return await this.DailySandpEntity
        .createQueryBuilder()
        .update(DailySandpEntity)
        .set({
            ...data
        })
        .where("id = :id", { id })
        .execute();
    }



    async insertDailySP500(data: createDailySandpDto){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.DailySandpEntity
        .createQueryBuilder()
        .insert()
        .values({
          ...data, image: arraybuffer
            })
        .execute();
    }

    async getImage(id){
        const adbanner = await this.DailySandpEntity.findOne({
            select: ['image'],
            where: { id: id }
          });
          if (adbanner?.image) {
            return Buffer.from(adbanner.image);
          } else {
            return Buffer.from(new ArrayBuffer(0));
          }
    }


    async updateImage(data: DailySandpImageDto){
        const { id, image } = data;
         data.image = data.image ? Buffer.from(data.image) : null;
        console.log(data.image);
        try{
            return await this.DailySandpEntity
            .createQueryBuilder()
            .update()
            .set({
                image: data.image
            })
            .where("id = :id", {id: id})
            .execute();
        }catch(err){
            return {err: err.message}
        }

    }

    async deleteDailySP500(id: number) {
        return await this.DailySandpEntity.createQueryBuilder()
          .delete()
          .where('id = :id', { id: id })
          .execute();
      }

}


// fetch ADW
// select symbol, call_put, strike, ratio, IF(STRCMP(a.first_date,'0000-00-00'), a.first_date, NULL) as first_date, IF(STRCMP(a.last_date,'0000-00-00'), a.last_date, NULL) as last_date from mqwarrantscms.newly_listed a where symbol='ITD28C1602A'