import { Module } from '@nestjs/common';
import { HotTopicReviewController } from './hot-topic-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotTopicReviewEntity } from './hot-topic-review.entitiy';
import { HotTopicReviewService } from './hot-topic-review.service';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Module({
  controllers: [HotTopicReviewController],
  providers: [HotTopicReviewService],
  imports: [TypeOrmModule.forFeature([HotTopicReviewEntity]),
  TypeOrmModule.forFeature(
    [warrants_screener],
    process.env.WARRANTS_DB_CONN_NAME,
  )]
})
export class HotTopicReviewModule {}
