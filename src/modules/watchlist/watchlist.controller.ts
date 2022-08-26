import {
    Get,
    UseGuards,
    Request,
    Post,
    Body,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Controller } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WatchListDto } from './watchlist.dto';
import { WatchListService } from './watchlist.service';

  @Controller("/watchlist")

  export class WatchlistController{
    constructor(private readonly watchListService: WatchListService ) {}

    // @UseGuards(JwtAuthGuard)
    @Post()
    async getWatchList(@Body() body: WatchListDto){
        return await this.watchListService.getWatchlist(body);
    }
        
  }