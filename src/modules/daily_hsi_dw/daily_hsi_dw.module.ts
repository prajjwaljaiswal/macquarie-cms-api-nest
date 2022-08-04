import { Module } from '@nestjs/common';
import { DailySandpController } from './daily_hsi_dw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyHsiDwEntity } from './daily_hsi_dw.entitiy';
import { DailySandpService } from './daily_hsi_dw.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [DailySandpController],
  providers: [DailySandpService],
  imports: [TypeOrmModule.forFeature([DailyHsiDwEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class DailyHsiDwModule {}
