import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CautionController } from './caution-list.controller';
import { CautionEntity } from './caution-list.entity';
import { CautionService } from './caution-list.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [CautionController],
  providers: [CautionService],
  imports: [TypeOrmModule.forFeature([CautionEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  ),],
  
})
export class CautionModule {}
