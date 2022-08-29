import { Module } from '@nestjs/common';
import { DailySingleStockController } from './dailySingleStock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySingleStockEntity } from './dailySingleStock.entitiy';
import { DailySingleStockService } from './dailySingleStock.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [DailySingleStockController],
  providers: [DailySingleStockService],
  imports: [TypeOrmModule.forFeature([DailySingleStockEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class DailySingleStockModule {}
