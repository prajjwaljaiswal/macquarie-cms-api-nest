import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FastTrackController } from './fasttrack.controller';
import { FastTrackEntity } from './fast-track.entity';
import { FastTrackService } from './fast-track.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [FastTrackController],
  providers: [FastTrackService],
  imports: [TypeOrmModule.forFeature([FastTrackEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  ),],
  
})
export class FastTrackModule {}
