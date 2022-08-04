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
import { UpdateNewsletterdto } from './newsletter.dto';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly NewsletterService: NewsletterService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getNewsletter() {
    return this.NewsletterService.getNewsletter();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tips')
  getNewsletterTips() {
    return this.NewsletterService.getNewsletterTips();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/news')
  getNewletterNews() {
    return this.NewsletterService.getNewsletterNews();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  updateNewsletter(@Body() body: UpdateNewsletterdto) {
    return this.NewsletterService.updateNewsletter(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to update',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/status')
  updateSendStatus() {
    return this.NewsletterService.updateSendStatus()
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to send',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/tips/:id')
  deleteNewsletterTips(@Param('id', new ParseIntPipe()) id: number) {
    return this.NewsletterService.deleteNewsletterTips(id)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to remove tips',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/news/:id')
  deleteNewsletterNews(@Param('id', new ParseIntPipe()) id: number) {
    return this.NewsletterService.deleteNewsletterNews(id)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to remove image',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
