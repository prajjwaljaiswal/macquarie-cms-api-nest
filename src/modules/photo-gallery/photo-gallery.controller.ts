/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreatePhotoGallerydto,
  DeletePhotoGallerydto,
} from './photo-gallery.dto';
import { PhotoGalleryService } from './photo-gallery.service';

@Controller('gallery')
export class PhotoGalleryController {
  constructor(private readonly PhotoGalleryService: PhotoGalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id/:page')
  getPhotoById(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('page', new ParseIntPipe()) page: number,
  ) {
    if (page < 1) {
      throw new HttpException(
        {
          SUCCESS: false,
          MESSAGE: 'Page must be a positive integer',
          STATUSCODE: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.PhotoGalleryService.getGalleryById(id, page);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  insertPhotoGallery(@Body() body: CreatePhotoGallerydto) {
    return this.PhotoGalleryService.insertPhotoGallery(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to save gallery',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  deletePhotoGallery(@Body() body: DeletePhotoGallerydto) {
    return this.PhotoGalleryService.deletePhotoGallery(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to remove gallery',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
