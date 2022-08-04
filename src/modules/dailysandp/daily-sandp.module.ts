import { Module } from '@nestjs/common';
import { DailySandpController } from './daily-sandp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySandpEntity } from './daily-sandp.entitiy';
import { DailySandpService } from './daily-sandp.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [DailySandpController],
  providers: [DailySandpService],
  imports: [TypeOrmModule.forFeature([DailySandpEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class DailySandpModule {}
