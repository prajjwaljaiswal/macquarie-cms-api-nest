/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerSearchController } from './power-search.controller';
import { PowerSearchService } from './power-search.service';
import { warrants_screener } from './warrants_screener.entity';
import { warrants_screener_history } from './warrants_screener_history.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [warrants_screener,warrants_screener_history],
      process.env.WARRANTS_DB_CONN_NAME,
    ),
  ],
  controllers: [PowerSearchController],
  providers: [PowerSearchService],
})
export class PowerSearchModule {}
