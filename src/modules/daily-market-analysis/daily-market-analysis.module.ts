/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dailyMarketAnalysisListEntity } from './daily-market-analysis.entity';
import { dailyMarketAnalysisWarrantsEntity } from './daily-market-analysis-warrants.entity';
import { dailyMarketAnalysisController } from './daily-market-analysis.controller';
import { dailyMarketAnalysisService } from './daily-market-analysis.service';

@Module({
  controllers: [dailyMarketAnalysisController],
  providers: [dailyMarketAnalysisService],
  imports: [TypeOrmModule.forFeature([dailyMarketAnalysisListEntity, dailyMarketAnalysisWarrantsEntity])],
})
export class dailyMarketAnalysisModule {}
