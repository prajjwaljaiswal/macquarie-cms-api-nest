import { Module } from '@nestjs/common';
import { DailySet50TipsController } from './daily-set50-tips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySet50TipsEntity } from './daily-set50-tips.entitiy';
import { DailySet50TipsService } from './daily-set50-tips.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [DailySet50TipsController],
  providers: [DailySet50TipsService],
  imports: [TypeOrmModule.forFeature([DailySet50TipsEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class DailySet50TipsModule {}
