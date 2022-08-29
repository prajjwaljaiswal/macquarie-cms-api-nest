import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { createActivitiesDto } from './all_foreign_index.dto';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { createActivitiesDto, ActivitiesDto } from './activities.dto';
import { ActivitiesEntity, ActivitiesImageEntity } from './activities.entitiy';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(ActivitiesEntity)
        private readonly ActivitiesEntity: Repository<ActivitiesEntity>,
        @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
        private readonly wsRepository: Repository<warrants_screener>,
    ){}

   async getTopPicks(){
        return await this.ActivitiesEntity
        .createQueryBuilder()
        .select([
           'id',
           'activities_status',
           'publish_date',
           'en_title',
           'thai_title',
           'en_full_content',
           'thai_full_content'
          ])
          .orderBy('publish_date', 'DESC')
          .getRawMany();
    }


    async ActivitiesById(id){
        return await this.ActivitiesEntity
        .find({id});
    }

    async updateDailySP500(data: ActivitiesDto, id){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.ActivitiesEntity
        .createQueryBuilder()
        .update(ActivitiesEntity)
        .set({
            ...data, image: arraybuffer
        })
        .where("id = :id", { id })
        .execute();
    }



    async insert(data: createActivitiesDto){
        let arraybuffer = data.image ? Buffer.from(data.image) : null;
        return await this.ActivitiesEntity
        .createQueryBuilder()
        .insert()
        .values({
          ...data, image: arraybuffer
            })
        .execute();
    }

    async getImage(id){
        return await this.ActivitiesEntity.find({
            select: ['id', 'image'],
            where: { id: id }
          });
    }


    async updateImage(data){
        const { id } = data;
        return await this.ActivitiesEntity
        .createQueryBuilder()
        .update(ActivitiesEntity)
        .set({
            ...data
        })
        .where("id = :id", {id})
        .execute();
    }

    async deleteActivities(id: number) {
        return await this.ActivitiesEntity.createQueryBuilder()
          .delete()
          .where('id = :id', { id: id })
          .execute();
      }
}


// fetch ADW
// select symbol, call_put, strike, ratio, IF(STRCMP(a.first_date,'0000-00-00'), a.first_date, NULL) as first_date, IF(STRCMP(a.last_date,'0000-00-00'), a.last_date, NULL) as last_date from mqwarrantscms.newly_listed a where symbol='ITD28C1602A'