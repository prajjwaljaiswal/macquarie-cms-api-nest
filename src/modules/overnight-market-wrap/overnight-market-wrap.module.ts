import { Module } from '@nestjs/common';
import { OMWService } from './overnight-market-wrap.service';
import { OMWController } from './overnight-market-wrap.controller';
import { OMWEntity } from './overnight-market-wrap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OMWController],
  providers: [OMWService],
  imports: [TypeOrmModule.forFeature([OMWEntity])],
})
export class OMWModule {}
