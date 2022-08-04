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
import { CreateAdBannerDto, UpdateAdBannerDto } from './news-highlights.dto';
import { NewsHighlightsService } from './news-highlights.service';

@Controller('news-highlights')
export class  NewsHighlightsController {
  constructor(private readonly NewsHighlightsService: NewsHighlightsService) {}

  
  @Get()
  FindAll() {
    return this.NewsHighlightsService.FindAll();
  }
}
