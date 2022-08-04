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
import { createNoticeDto, updateNoticeDto } from './notice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly NoticeService: NoticeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/pending')
  getPending() {
    return this.NoticeService.getPending();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/confirmed')
  getConfirmed() {
    return this.NoticeService.getConfirmed();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getNoticeById(@Param('id', new ParseIntPipe()) id: number) {
    return this.NoticeService.getNoticeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createNotice(@Body() body: createNoticeDto) {
    return this.NoticeService.createNotice(body)
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
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to save notice',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateNotice(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: updateNoticeDto,
  ) {
    return this.NoticeService.updateNotice(id, body)
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
            MESSAGE: 'Failed to update notice',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteNotice(@Param('id', new ParseIntPipe()) id: number) {
    return this.NoticeService.deleteNotice(id)
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
            MESSAGE: 'Failed to remove notice',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
