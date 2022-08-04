/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RegistrantModule } from './modules/registrant/registrant.module';
import { HotlistModule } from './modules/hotlist/hotlist.module';
import { PowerSearchModule } from './modules/power-search/power-search.module';
import { dw_hot_list } from './modules/hotlist/dw_hot_list.entity';
import { registrant } from './modules/registrant/registrant.entity';
import { mqwarrants_login } from './modules/user/mqwarrants_login.entity';
import { warrants_screener } from './modules/power-search/warrants_screener.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from './constants';
import { MMBEntity } from './modules/morning-market-buzz/morning-market-buzz.entity';
import { MMBModule } from './modules/morning-market-buzz/morning-market-buzz.module';
import { OMWEntity } from './modules/overnight-market-wrap/overnight-market-wrap.entity';
import { OMWModule } from './modules/overnight-market-wrap/overnight-market-wrap.module';
import { IFListEntity } from './modules/index-future/index-future-list.entity';
import { IFWarrantsEntity } from './modules/index-future/index-future-warrants.entity';
import { IFModule } from './modules/index-future/index-future.module';
import { AdBannerEntity } from './modules/adbanner/adbanner.entity';
import { AdBannerModule } from './modules/adbanner/adbanner.module';
import { HomeBannerEntity } from './modules/homebanner/homebanner.entity';
import { HomeBannerModule } from './modules/homebanner/homebanner.module';
import { SeminarEntity } from './modules/seminar/seminar.entity';
import { SeminarModule } from './modules/seminar/seminar.module';
import { SeminarRegEntity } from './modules/seminar-registration/seminar-registration.entity';
import { RegEntity } from './modules/seminar-registration/registrant.entity';
import { SeminarRegModule } from './modules/seminar-registration/seminar-registration.module';
import { AlbumCoverEntity } from './modules/album-cover/album-cover.entity';
import { PhotoGalleryEntity } from './modules/photo-gallery/photo-gallery.entity';
import { AlbumCoverModule } from './modules/album-cover/album-cover.module';
import { PhotoGalleryModule } from './modules/photo-gallery/photo-gallery.module';
import { TermsheetEntity } from './modules/termsheet/termsheet.entity';
import { TermsheetModule } from './modules/termsheet/termsheet.module';
import { NoticeEntity } from './modules/expiry-adjustment-notice/notice.entity';
import { NoticeModule } from './modules/expiry-adjustment-notice/notice.module';
import { mqwarrants_login_history } from './modules/user/mqwarrants_login_history.entity';
import { NewsletterEntity } from './modules/newsletter/newsletter.entity';
import { NewsletterTipsEntity } from './modules/newsletter/newsletter-tips.entity';
import { NewsletterNewsEntity } from './modules/newsletter/newsletter-news.entity';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { FileModule } from './modules/file/file.module';
import { FastTrackModule } from './modules/fast-track/fast-track.module';
import { TodaysTopPicksModule } from './modules/todaysTopPicks/todays-top-picks.module';
import { TodaysTopPicksEntity } from './modules/todaysTopPicks/todays-top-picks.entitiy';
import { NewsHeighlightsModule } from './modules/news-highlights/news-highlights.module';
import { DailySandpModule } from './modules/dailysandp/daily-sandp.module';
import { DailySandpEntity } from './modules/dailysandp/daily-sandp.entitiy';
import { DailyHsiDwModule } from './modules/daily_hsi_dw/daily_hsi_dw.module';
import { DailyHsiDwEntity } from './modules/daily_hsi_dw/daily_hsi_dw.entitiy';

const defaultOptions = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['./src/*.entity{.ts,.js}', 'dist/**/*.entity{.ts,.js}', TodaysTopPicksEntity, DailySandpEntity, DailyHsiDwEntity],
  synchronize: false,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
      cache: true,
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      imports: [ConfigModule],
      ...defaultOptions,
      database: process.env.MQ_DB,
    } as any),
    TypeOrmModule.forRoot({
      imports: [ConfigModule],
      ...defaultOptions,
      name: process.env.WARRANTS_DB_CONN_NAME,
      database: process.env.WARRANTS_DB,
    } as any),
    RegistrantModule,
    HotlistModule,
    PowerSearchModule,
    MMBModule,
    OMWModule,
    IFModule,
    AdBannerModule,
    HomeBannerModule,
    SeminarModule,
    SeminarRegModule,
    AlbumCoverModule,
    PhotoGalleryModule,
    TermsheetModule,
    NoticeModule,
    NewsletterModule,
    FileModule,
    FastTrackModule,
    TodaysTopPicksModule,
    NewsHeighlightsModule,
    DailySandpModule,
    DailyHsiDwModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
