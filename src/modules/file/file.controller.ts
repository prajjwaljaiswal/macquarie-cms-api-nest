/* eslint-disable prettier/prettier */
import { ConsoleLogger, Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Readable } from 'stream';
import { Response } from 'express';
import { FileService } from './file.service';
import { Console } from 'console';

@Controller('file')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Get('/pdf/termsheet/:symbol')
  async getTermsheetPdf(@Param('symbol') symbol: string, @Res() res: Response) {
    const buffer = await this.FileService.getTermsheetPdf(symbol);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/pdf/notice/:id')
  async getNoticePdf(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getNoticePdf(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/seminar/:id')
  async getSeminarImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getSeminarImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/adbanner/:id')
  async getAdBannerImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getAdBannerImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/homebanner/:id')
  async getHomeBannerImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getHomeBannerImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/gallery/:id')
  async getPhotoGalleryImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getPhotoGalleryImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/album/:id')
  async getAlbumCoverImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getAlbumCoverImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/tips/:id')
  async getNewsletterTipsImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getNewsletterTipsImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }

  @Get('/image/news/:id')
  async getNewsletterNewsImage(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const buffer = await this.FileService.getNewsletterNewsImage(id);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }
}
