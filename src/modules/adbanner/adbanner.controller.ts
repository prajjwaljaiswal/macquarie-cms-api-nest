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
import { CreateAdBannerDto, UpdateAdBannerDto } from './adbanner.dto';
import { AdBannerService } from './adbanner.service';

@Controller('adbanner')
export class AdBannerController {
  constructor(private readonly AdBannerService: AdBannerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAdBannerList() {
    return this.AdBannerService.getAdBannerList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getAdBannerById(@Param('id', new ParseIntPipe()) id: number) {
    return this.AdBannerService.getAdBannerById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAdBanner(@Body() body: CreateAdBannerDto) {
    return this.AdBannerService.insertAdBanner(body)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch((error) => {
        console.log(error);
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to add banner',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateAdBanner(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateAdBannerDto,
  ) {
    return this.AdBannerService.updateAdBanner(id, body)
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

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteAdBanner(@Param('id', new ParseIntPipe()) id: number) {
    return this.AdBannerService.deleteAdBanner(id)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to remove banner',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
