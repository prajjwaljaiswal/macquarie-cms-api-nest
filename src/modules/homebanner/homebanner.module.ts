/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeBannerController } from './homebanner.controller';
import { HomeBannerEntity } from './homebanner.entity';
import { HomeBannerService } from './homebanner.service';

@Module({
  controllers: [HomeBannerController],
  providers: [HomeBannerService],
  imports: [TypeOrmModule.forFeature([HomeBannerEntity])],
})
export class HomeBannerModule {}
