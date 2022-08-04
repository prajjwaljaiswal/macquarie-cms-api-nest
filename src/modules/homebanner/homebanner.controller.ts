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
import { CreateHomeBannerDto, UpdateHomeBannerDto } from './homebanner.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HomeBannerService } from './homebanner.service';

@Controller('homebanner')
export class HomeBannerController {
  constructor(private readonly HomeBannerService: HomeBannerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHomeBannerList() {
    return this.HomeBannerService.getHomeBannerList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getHomeBannerById(@Param('id', new ParseIntPipe()) id: number) {
    return this.HomeBannerService.getHomeBannerById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createHomeBanner(@Body() body: CreateHomeBannerDto) {
    return this.HomeBannerService.insertHomeBanner(body)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch((error) => {
        console.log(error);
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to add home banner',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateHomeBanner(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateHomeBannerDto,
  ) {
    return this.HomeBannerService.updateHomeBanner(id, body)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to update home banner',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteHomeBanner(@Param('id', new ParseIntPipe()) id: number) {
    return this.HomeBannerService.deleteHomeBanner(id)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to remove home banner',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
