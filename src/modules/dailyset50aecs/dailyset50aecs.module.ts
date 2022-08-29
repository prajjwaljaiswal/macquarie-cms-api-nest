import { Module } from '@nestjs/common';
import { DailySet50AecsController } from './dailyset50aecs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySet50AecsEntity } from './dailyset50aecs.entitiy';
import { DailySet50AecsService } from './dailyset50aecs.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [DailySet50AecsController],
  providers: [DailySet50AecsService],
  imports: [TypeOrmModule.forFeature([DailySet50AecsEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class DailySet50AecsModule {}
