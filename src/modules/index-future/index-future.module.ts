/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IFListEntity } from './index-future-list.entity';
import { IFWarrantsEntity } from './index-future-warrants.entity';
import { IFController } from './index-future.controller';
import { IFService } from './index-future.service';

@Module({
  controllers: [IFController],
  providers: [IFService],
  imports: [TypeOrmModule.forFeature([IFListEntity, IFWarrantsEntity])],
})
export class IFModule {}
