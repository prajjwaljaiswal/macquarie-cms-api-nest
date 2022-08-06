import { Module } from '@nestjs/common';
import { AllForeignIndexController } from './all_foreign_index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllForeignIndexEntity } from './all_foreign_index.entitiy';
import { AllForeignIndexService } from './all_foreign_index.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [AllForeignIndexController],
  providers: [AllForeignIndexService],
  imports: [TypeOrmModule.forFeature([AllForeignIndexEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class AllForeignIndexModule {}
