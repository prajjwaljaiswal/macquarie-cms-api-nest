import { Module } from '@nestjs/common';
import { MarketComentryService } from './market-commentary.service';
import { MarketComentryController } from './market-commentary.controller';
import { MarketComentryEntity } from './market-commentary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MarketComentryController],
  providers: [MarketComentryService],
  imports: [TypeOrmModule.forFeature([MarketComentryEntity])],
})
export class MarketComentryModule {}
