import { Module } from '@nestjs/common';
import { DailyHsiDwController } from './dailyHsiUpdate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyHsiDwEntity } from './dailyHsiUpdate.entitiy';
import { DailyHsiDwService } from './dailyHsiUpdate.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [DailyHsiDwController],
  providers: [DailyHsiDwService],
  imports: [TypeOrmModule.forFeature([DailyHsiDwEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class DailyHsiDwModule {}
