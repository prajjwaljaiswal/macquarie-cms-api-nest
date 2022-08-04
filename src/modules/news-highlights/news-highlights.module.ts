import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsHighlightsController } from './news-highlights.controller';
import { NewsHighlightsEntity } from './news-highlights.entity';
import { NewsHighlightsService } from './news-highlights.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [NewsHighlightsController],
  providers: [NewsHighlightsService],
  imports: [TypeOrmModule.forFeature([NewsHighlightsEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  ),],
  
})
export class NewsHeighlightsModule {}
