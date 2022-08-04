/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateAdBannerDto, UpdateAdBannerDto } from './news-highlights.dto';
import { NewsHighlightsEntity } from './news-highlights.entity';
import { warrants_screener } from '../power-search/warrants_screener.entity';

@Injectable()
export class NewsHighlightsService {
  constructor(
    @InjectRepository(NewsHighlightsEntity)
    private readonly NewsHighlightsRespository: Repository<NewsHighlightsEntity>,
    @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
    private readonly wsRepository: Repository<warrants_screener>,
  ) {}
  
async FindAll(): Promise<NewsHighlightsEntity[]> {

    return await this.NewsHighlightsRespository
    .find()
   
}

}
