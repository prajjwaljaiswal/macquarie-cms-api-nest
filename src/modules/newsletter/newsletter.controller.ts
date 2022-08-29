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
  async getNewsletter() {
    try{
      return await this.NewsletterService.getNewsletter();
    }catch(err){
      return err.message;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tips')
  async getNewsletterTips() {
    try{
    return await this.NewsletterService.getNewsletterTips();
    }catch(err){
      return err.message;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/news')
  async getNewletterNews() {
    try{
    return await this.NewsletterService.getNewsletterNews();
  }catch(err){
    return err.message;
  }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateNewsletter(@Body() body: UpdateNewsletterdto) {
    return await this.NewsletterService.updateNewsletter(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((e) => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: e.message,
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
