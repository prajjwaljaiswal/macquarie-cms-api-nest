/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdBannerEntity } from '../adbanner/adbanner.entity';
import { AlbumCoverEntity } from '../album-cover/album-cover.entity';
import { NoticeEntity } from '../expiry-adjustment-notice/notice.entity';
import { NewsletterNewsEntity } from '../newsletter/newsletter-news.entity';
import { NewsletterTipsEntity } from '../newsletter/newsletter-tips.entity';
import { PhotoGalleryEntity } from '../photo-gallery/photo-gallery.entity';
import { SeminarEntity } from '../seminar/seminar.entity';
import { TermsheetEntity } from '../termsheet/termsheet.entity';
import { HomeBannerEntity } from '../homebanner/homebanner.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    TypeOrmModule.forFeature([
      PhotoGalleryEntity,
      AlbumCoverEntity,
      SeminarEntity,
      NewsletterTipsEntity,
      NewsletterNewsEntity,
      AdBannerEntity,
      TermsheetEntity,
      HomeBannerEntity,
      NoticeEntity,
    ]),
  ],
})
export class FileModule {}
