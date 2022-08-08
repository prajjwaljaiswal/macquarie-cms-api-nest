/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdBannerEntity } from '../adbanner/adbanner.entity';
import { AlbumCoverEntity } from '../album-cover/album-cover.entity';
import { NoticeEntity } from '../expiry-adjustment-notice/notice.entity';
import { NewsletterNewsEntity } from '../newsletter/newsletter-news.entity';
import { NewsletterTipsEntity } from '../newsletter/newsletter-tips.entity';
import { PhotoGalleryEntity } from '../photo-gallery/photo-gallery.entity';
import { SeminarEntity } from '../seminar/seminar.entity';
import { TermsheetEntity } from '../termsheet/termsheet.entity';
import { HomeBannerEntity } from '../homebanner/homebanner.entity';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(PhotoGalleryEntity)
    private readonly PhotoGalleryRepository: Repository<PhotoGalleryEntity>,
    @InjectRepository(AlbumCoverEntity)
    private readonly AlbumCoverRepository: Repository<AlbumCoverEntity>,
    @InjectRepository(AdBannerEntity)
    private readonly AdBannerRepository: Repository<AdBannerEntity>,
    @InjectRepository(SeminarEntity)
    private readonly SeminarRepository: Repository<SeminarEntity>,
    @InjectRepository(NewsletterTipsEntity)
    private readonly NewsletterTipsRepository: Repository<NewsletterTipsEntity>,
    @InjectRepository(NewsletterNewsEntity)
    private readonly NewsletterNewsRepository: Repository<NewsletterNewsEntity>,
    @InjectRepository(TermsheetEntity)
    private readonly TermsheetRepository: Repository<TermsheetEntity>,
    @InjectRepository(NoticeEntity)
    private readonly NoticeRepository: Repository<NoticeEntity>,
    @InjectRepository(HomeBannerEntity)
    private readonly HomeBannerRepository: Repository<HomeBannerEntity>,
  ) { }

  async getTermsheetPdf(symbol: string): Promise<Buffer> {
    const termsheet = await this.TermsheetRepository.findOne({
      select: ['pdf'],
      where: { symbol: symbol },
    });
    if (termsheet?.pdf) {
      return Buffer.from(termsheet.pdf);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getNoticePdf(id: number): Promise<Buffer> {
    const notice = await this.NoticeRepository.findOne({
      select: ['pdf'],
      where: { id: id },
    });

    if (notice?.pdf) {
      return Buffer.from(notice.pdf);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getSeminarImage(id: number): Promise<Buffer> {
    const seminar = await this.SeminarRepository.findOne({
      select: ['en_poster'],
      where: { id: id },
    });
    if (seminar?.en_poster) {
      return Buffer.from(seminar.en_poster);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getAdBannerImage(id: number): Promise<Buffer> {
    const adbanner = await this.AdBannerRepository.findOne({
      select: ['image'],
      where: { id: id },
    });
    if (adbanner?.image) {
      return Buffer.from(adbanner.image);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getAlbumCoverImage(id: number): Promise<Buffer> {
    const cover = await this.AlbumCoverRepository.findOne({
      select: ['cover'],
      where: { id: id },
    });
    if (cover?.cover) {
      return Buffer.from(cover.cover);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getPhotoGalleryImage(id: number): Promise<Buffer> {
    const gallery = await this.PhotoGalleryRepository.findOne({
      select: ['photo'],
      where: { id: id },
    });
    if (gallery?.photo) {
      return Buffer.from(gallery.photo);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getNewsletterTipsImage(id: number): Promise<Buffer> {
    const tips = await this.NewsletterTipsRepository.findOne({
      select: ['image'],
      where: { id: id },
    });
    if (tips?.image) {
      return Buffer.from(tips.image);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getNewsletterNewsImage(id: number): Promise<Buffer> {
    const news = await this.NewsletterNewsRepository.findOne({
      select: ['image'],
      where: { id: id },
    });
    if (news?.image) {
      return Buffer.from(news.image);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }

  async getHomeBannerImage(id: number): Promise<Buffer> {
    const homebanner = await this.HomeBannerRepository.findOne({
      select: ['desktop_image'],
      where: { id: id },
    });
    if (homebanner?.desktop_image) {
      return Buffer.from(homebanner.desktop_image);
    } else {
      return Buffer.from(new ArrayBuffer(0));
    }
  }
}


