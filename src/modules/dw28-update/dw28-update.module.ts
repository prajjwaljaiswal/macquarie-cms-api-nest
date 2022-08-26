/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dw28updateListEntity } from './dw28-update.entity';
import { dw28updateWarrantsEntity } from './dw28-update-warrants.entity';
import { dw28updateController } from './dw28-update.controller';
import { dw28updateService } from './dw28-update.service';

@Module({
  controllers: [dw28updateController],
  providers: [dw28updateService],
  imports: [TypeOrmModule.forFeature([dw28updateListEntity, dw28updateWarrantsEntity])],
})
export class Dw28updateModule {}
