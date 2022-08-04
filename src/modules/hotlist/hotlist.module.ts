import { Module } from '@nestjs/common';
import { HotlistService } from './hotlist.service';
import { HotlistController } from './hotlist.controller';
import { dw_hot_list } from './dw_hot_list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([dw_hot_list]),
    TypeOrmModule.forFeature(
      [warrants_screener],
      process.env.WARRANTS_DB_CONN_NAME,
    ),
  ],

  providers: [HotlistService],
  controllers: [HotlistController],
})
export class HotlistModule {}
