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
import { CreateAdBannerDto, UpdateAdBannerDto } from './caution-list.dto';
import { CautionService } from './caution-list.service';

@Controller('caution-list')
export class  CautionController {
  constructor(private readonly CautionService: CautionService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAdBannerList() {
    return this.CautionService.getAdBannerList();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/:id')
  // getAdBannerById(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.CautionService.getAdBannerById(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // createAdBanner(@Body() body: CreateAdBannerDto) {
  //   return this.CautionService.insertAdBanner(body)
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
  updateCaution(
    
    @Body() body: any,
  ) {
    return this.CautionService.updateCaution(body)
      .then(() => JSON.stringify({ SUCCESS: true }))
      .catch((err) => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/delete/:id')
  // deleteAdBanner(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.CautionService.deleteAdBanner(id)
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
