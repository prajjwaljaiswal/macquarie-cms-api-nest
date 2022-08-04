import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterEntity } from './newsletter.entity';
import { NewsletterService } from './newsletter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterNewsEntity } from './newsletter-news.entity';
import { NewsletterTipsEntity } from './newsletter-tips.entity';
import { MMBService } from '../morning-market-buzz/morning-market-buzz.service'
import { MMBEntity } from '../morning-market-buzz/morning-market-buzz.entity';
import { OMWService } from '../overnight-market-wrap/overnight-market-wrap.service'
import { OMWEntity } from '../overnight-market-wrap/overnight-market-wrap.entity';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService,MMBService,OMWService],
  imports: [
    TypeOrmModule.forFeature([
      NewsletterEntity,
      NewsletterNewsEntity,
      NewsletterTipsEntity,
      MMBEntity,
      OMWEntity
    ]),
  ],
})
export class NewsletterModule {}
