/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { dw28updateListEntity } from './dw28-update.entity';
import { dw28updateWarrantsEntity } from './dw28-update-warrants.entity';
import { Updatedw28updateDto } from './dw28-update.dto';

@Injectable()
export class dw28updateService {
  constructor(
    @InjectRepository(dw28updateListEntity)
    private readonly dw28updateListRepository: Repository<dw28updateListEntity>,
    @InjectRepository(dw28updateWarrantsEntity)
    private readonly dw28updateWarrantsRepository: Repository<dw28updateWarrantsEntity>,
  ) {}

  async getdwList(): Promise<dw28updateListEntity[]> {
    return await this.dw28updateListRepository.find({
      order: { id: 'DESC' },
    });
  }

  async getdwListById(id){
    return await this.dw28updateListRepository.find({
        where: { id: id }
      });
    }


  async insertdwListById(data){
    data.image = data.image ? Buffer.from(data.image) : null;
    return await this.dw28updateListRepository
    .createQueryBuilder()
    .insert()
    .values({
      ...data, image: data.image
        })
    .execute();
  }


  async deletedwListByid(id: number) {
    return await this.dw28updateListRepository.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }

  async updatedwListById(id, data){
        data.image = data.image ? Buffer.from(data.image) : null;
        return await this.dw28updateListRepository
        .createQueryBuilder()
        .update(dw28updateListEntity)
        .set({
          ...data,
          image: data.image
        })
        .where("id = :id", {id})
        .execute();
    }

  // async updatedw28updateWarrants(data: Updatedw28updateDto): Promise<UpdateResult> {
  //   const cleardw28update = await this.dw28updateWarrantsRepository.createQueryBuilder()
  //     .update()
  //     .set({
  //       future_ric: '',
  //       future_dsply_name: '',
  //     })
  //     .where('future_ric = :future_ric', { future_ric: data.future_ric })
  //     .execute();
  //   return data.rics.length === 0
  //     ? cleardw28update
  //     : await this.dw28updateWarrantsRepository.createQueryBuilder()
  //         .update()
  //         .set({
  //           future_ric: data.future_ric,
  //           future_dsply_name: data.future_dsply_name,
  //         })
  //         .where('wrnt_ric in (:...rics)', { rics: data.rics })
  //         .execute();
  // }
}
