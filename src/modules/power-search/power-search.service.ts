/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { warrants_screener } from './warrants_screener.entity';
import { warrants_screener_history } from './warrants_screener_history.entity';

@Injectable()
export class PowerSearchService {
  constructor(
    @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
    private readonly warrentsScreenerRepository: Repository<warrants_screener>,
    @InjectRepository(warrants_screener_history, process.env.WARRANTS_DB_CONN_NAME)
    private readonly warrentsScreenerHistoty: Repository<warrants_screener_history>,
  ) { }

  async find(query): Promise<any> {
    return await this.warrentsScreenerRepository.find({
      select: [
        'ric',
        'ticker',
        'dsply_name',
        'dsply_nmll',
        'underlying_ric',
        'underlying_name',
      ],
      where: [
        {
          ticker: Like(`%${query.ticker}%`),
          exchange_code: 'SES',
        },
        { dsply_name: Like(`%${query.dsply_name}%`), exchange_code: 'SES' },
      ],
      take: parseInt(query.limit, 10) || 10,
      skip: parseInt(query.skip, 10) || 0,
      order: { ticker: 'ASC' },
    });
  }

  async searchSymbol(query){
    return await this.warrentsScreenerRepository
    .query(`SELECT * FROM (SELECT a.ric,a.ticker as symbol,a.dsply_name as name,a.underlying_ric FROM warrants_screener a WHERE (ticker='${query.ric}' OR dsply_name='${query.ric}') AND a.maturity>=CURDATE() AND exchange_code = 'SET' and issuer_name ='Macquarie Securities Thailand Ltd' ORDER BY ticker ) sql0 UNION SELECT * FROM ( SELECT a.ric,a.ticker,a.dsply_name as name,a.underlying_ric FROM warrants_screener a WHERE (ticker LIKE '${query.ric}%' OR dsply_name LIKE '${query.ric}%') AND a.maturity>=CURDATE() AND exchange_code = 'SET' and issuer_name ='Macquarie Securities Thailand Ltd' ORDER BY ticker ) sql1 UNION SELECT * FROM ( SELECT a.ric,a.ticker,a.dsply_name as name,a.underlying_ric FROM warrants_screener a WHERE (ticker LIKE '%${query.ric}%' OR dsply_name LIKE '%${query.ric}%') AND a.maturity>=CURDATE() AND exchange_code = 'SET' and issuer_name ='Macquarie Securities Thailand Ltd' ORDER BY ticker ) sql2`);

  }

  async getUnderlyings(): Promise<warrants_screener[]> {
    return this.warrentsScreenerRepository
      .createQueryBuilder('sc')
      .select([
        'sc.underlying_ticker',
        'sc.underlying_name',
        'sc.ticker',
        'sc.dsply_name',
      ])

      .where('exchange_code = :excode', { excode: 'SES' })
      .groupBy('underlying_ticker')
      .orderBy('underlying_ticker')
      .getMany();
  }

  async getWarrants(): Promise<warrants_screener[]> {
    return this.warrentsScreenerRepository
      .createQueryBuilder('sc')
      .select([
        'sc.underlying_ticker',
        'sc.underlying_name',
        'sc.ticker',
        'sc.dsply_name',
      ])
      .where('exchange_code = :excode', { excode: 'SES' })
      .orderBy('ticker')
      .getMany();
  }

  async getWarrants_history(): Promise<any> {
    return {
      Warrants: await this.warrentsScreenerRepository
        .createQueryBuilder('sc')
        .select([
          'sc.underlying_ticker',
          'sc.underlying_name',
          'sc.ticker',
          'sc.dsply_name',
        ])
        .where('exchange_code = :excode', { excode: 'SES' })
        .orderBy('ticker')
        .getRawOne(),
      Histoty: await this.warrentsScreenerHistoty
        .createQueryBuilder('sc')
        .select([
          'sc.underlying_ticker',
          'sc.underlying_name',
          'sc.ticker',
          'sc.dsply_name',
        ])
        .where('exchange_code = :excode', { excode: 'SES' })
        .orderBy('ticker')
        .getRawOne()
    }
  }
}

// SELECT * FROM (SELECT a.ric,a.ticker,a.dsply_name as name,a.underlying_ric FROM warrants_screener a WHERE (ticker='t' OR dsply_name='t') AND a.maturity>=CURDATE() AND exchange_code = 'SET' and issuer_name ='Macquarie Securities Thailand Ltd' ORDER BY ticker ) sql0 UNION SELECT * FROM ( SELECT a.ric,a.ticker,a.dsply_name as name,a.underlying_ric FROM warrants_screener a WHERE (ticker LIKE 't%' OR dsply_name LIKE 't%') AND a.maturity>=CURDATE() AND exchange_code = 'SET' and issuer_name ='Macquarie Securities Thailand Ltd' ORDER BY ticker ) sql1 UNION SELECT * FROM ( SELECT a.ric,a.ticker,a.dsply_name as name,a.underlying_ric FROM warrants_screener a WHERE (ticker LIKE '%t%' OR dsply_name LIKE '%t%') AND a.maturity>=CURDATE() AND exchange_code = 'SET' and issuer_name ='Macquarie Securities Thailand Ltd' ORDER BY ticker ) sql2