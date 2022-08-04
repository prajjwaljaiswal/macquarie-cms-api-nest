import { Module } from '@nestjs/common';
import { TodaysTopPicksController } from './todays-top-picks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodaysTopPicksEntity } from './todays-top-picks.entitiy';
import { TodaysTopPicksService } from './todays-top-picks.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [TodaysTopPicksController],
  providers: [TodaysTopPicksService],
  imports: [TypeOrmModule.forFeature([TodaysTopPicksEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class TodaysTopPicksModule {}
