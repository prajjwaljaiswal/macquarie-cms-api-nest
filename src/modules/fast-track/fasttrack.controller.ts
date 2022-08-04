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
import { CreateAdBannerDto, UpdateAdBannerDto } from './fast-track.dto';
import { FastTrackService } from './fast-track.service';

@Controller('fastrack')
export class  FastTrackController {
  constructor(private readonly FastTrackService: FastTrackService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAdBannerList() {
    return this.FastTrackService.getAdBannerList();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/:id')
  // getAdBannerById(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.FastTrackService.getAdBannerById(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // createAdBanner(@Body() body: CreateAdBannerDto) {
  //   return this.FastTrackService.insertAdBanner(body)
  //     .then(() => JSON.stringify({ SUCCESS: true }))
  //     .catch((error) => {
  //       console.log(error);
  //       throw new HttpException(
  //         {
  //           SUCCESS: false,
  //           STATUSCODE: HttpStatus.BAD_REQUEST,
  //           MESSAGE: 'Failed to add banner',
  //         },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     });
  // }

  // @UseGuards(JwtAuthGuard)
  @Post('/update')
  updateFastTrack(
    
    @Body() body: any,
  ) {
    return this.FastTrackService.updateFastTrack(body)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to update banner',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/delete/:id')
  // deleteAdBanner(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.FastTrackService.deleteAdBanner(id)
  //     .then(() => JSON.stringify({ SUCCESS: true }))
  //     .catch(() => {
  //       throw new HttpException(
  //         {
  //           SUCCESS: false,
  //           STATUSCODE: HttpStatus.BAD_REQUEST,
  //           MESSAGE: 'Failed to remove banner',
  //         },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     });
  // }
}
