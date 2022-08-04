import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateIFDto } from './index-future.dto';
import { IFService } from './index-future.service';

@Controller('if')
export class IFController {
  constructor(private readonly IFService: IFService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  getIFList() {
    return this.IFService.getIFList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('warrants')
  getIFWarrants() {
    return this.IFService.getIFWarrants();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  updateIF(@Body() body: UpdateIFDto) {
    return this.IFService.updateIFWarrants(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to save',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
