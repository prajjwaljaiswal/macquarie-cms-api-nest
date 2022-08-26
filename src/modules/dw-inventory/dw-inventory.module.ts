/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dwInventoryListEntity } from './dw-inventory.entity';
import { dwInventoryWarrantsEntity } from './dw-inventory-warrants.entity';
import { dwInventoryController } from './dw-inventory.controller';
import { dwInventoryService } from './dw-inventory.service';

@Module({
  controllers: [dwInventoryController],
  providers: [dwInventoryService],
  imports: [TypeOrmModule.forFeature([dwInventoryListEntity, dwInventoryWarrantsEntity])],
})
export class dwInventoryModule {}
