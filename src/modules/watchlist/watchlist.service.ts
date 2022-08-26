import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchListEntitity } from './watchlist.entitiy';


@Injectable()
export class WatchListService {
    constructor(
        @InjectRepository(WatchListEntitity)
        private readonly WatchListEntitity: Repository<WatchListEntitity>,
    ){}

    async getWatchlist(body){
        const { ric, symbol, getRic } = body;
        let query = "";
        if(getRic){
            query = `Select s.ric, s.ticker as symbol,type, round(exercise_price, 2) as strike, round(wrnt_per_share, 2) as ratio,last_trading_date from mqwarrants.warrants_screener as s LEFT JOIN mqwarrants.warrants_issuers as i on i.issuer_name = s.issuer_name JOIN mqwarrants.warrants_issued_date as j on j.ric = s.ric where s.ric IN(${getRic});`
        }else{
            if(ric){
                query = `Select s.ric, s.ticker as symbol,type, round(exercise_price, 2) as strike, round(wrnt_per_share, 2) as ratio,last_trading_date from mqwarrants.warrants_screener as s LEFT JOIN mqwarrants.warrants_issuers as i on i.issuer_name = s.issuer_name JOIN mqwarrants.warrants_issued_date as j on j.ric = s.ric where s.ric = "${ric}";`
            }else {
                query = `select symbol, call_put as type, round(strike, 2), round(ratio, 2), IF(STRCMP(a.first_date,'0000-00-00'), a.first_date, NULL) as first_date, IF(STRCMP(a.last_date,'0000-00-00'), a.last_date, NULL) as last_trading_date from mqwarrantscms.newly_listed a where symbol='${symbol}'`;
            }
        }

        let data = await this.WatchListEntitity.query(query);
        return data;
    }

}

