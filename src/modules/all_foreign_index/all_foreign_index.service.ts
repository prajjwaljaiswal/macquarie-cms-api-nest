import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { createAllForeignIndexDto } from './all_foreign_index.dto';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { createAllForeignIndexDto, AllForeignIndexDto } from './all_foreign_index.dto';
import { AllForeignIndexEntity, AllForeignIndexImageEntity } from './all_foreign_index.entitiy';

@Injectable()
export class AllForeignIndexService {
    constructor(
        @InjectRepository(AllForeignIndexEntity)
        private readonly AllForeignIndexEntity: Repository<AllForeignIndexEntity>,
        @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
        private readonly wsRepository: Repository<warrants_screener>,
    ){}

   async getTopPicks(){
        return await this.AllForeignIndexEntity
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


    async AllForeignIndexById(id){
        return await this.AllForeignIndexEntity
        .find({id});
    }

    async updateDailySP500(data: AllForeignIndexDto, id){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.AllForeignIndexEntity
        .createQueryBuilder()
        .update(AllForeignIndexEntity)
        .set({
            ...data, image: arraybuffer
        })
        .where("id = :id", { id })
        .execute();
    }



    async insert(data: createAllForeignIndexDto){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.AllForeignIndexEntity
        .createQueryBuilder()
        .insert()
        .values({
          ...data, image: arraybuffer
            })
        .execute();
    }

    async getImage(id){
        return await this.AllForeignIndexEntity.find({
            select: ['id', 'image'],
            where: { id: id }
          });
    }


    async updateImage(data){
        const { id } = data;
        return await this.AllForeignIndexEntity
        .createQueryBuilder()
        .update(AllForeignIndexEntity)
        .set({
            ...data
        })
        .where("id = :id", {id})
        .execute();
    }

    async deleteAllForeignIndex(id: number) {
        return await this.AllForeignIndexEntity.createQueryBuilder()
          .delete()
          .where('id = :id', { id: id })
          .execute();
      }
}


// fetch ADW
// select symbol, call_put, strike, ratio, IF(STRCMP(a.first_date,'0000-00-00'), a.first_date, NULL) as first_date, IF(STRCMP(a.last_date,'0000-00-00'), a.last_date, NULL) as last_date from mqwarrantscms.newly_listed a where symbol='ITD28C1602A'