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
import { AlbumCoverService } from './album-cover.service';
import { CreateAlbumdto } from './album-cover.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('album')
export class AlbumCoverController {
  constructor(private readonly AlbumCoverService: AlbumCoverService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAlbumList() {
    return this.AlbumCoverService.getAlbumList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/enabledlist')
  getEnabledAlbumList() {
    return this.AlbumCoverService.getEnabledAlbumList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getAlbumById(@Param('id', new ParseIntPipe()) id: number) {
    return this.AlbumCoverService.getAlbumById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAlbum(@Body() body: CreateAlbumdto) {
    return this.AlbumCoverService.createAlbum(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to save album cover',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateAlbum(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: CreateAlbumdto,
  ) {
    return this.AlbumCoverService.updateAlbum(id, body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to update album cover',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteAlbum(@Param('id', new ParseIntPipe()) id: number) {
    return this.AlbumCoverService.deleteAlbum(id)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to remove album cover',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
