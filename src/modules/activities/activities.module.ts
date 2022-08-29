import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesEntity } from './activities.entitiy';
import { ActivitiesService } from './activities.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [TypeOrmModule.forFeature([ActivitiesEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class ActivitiesModule {}
