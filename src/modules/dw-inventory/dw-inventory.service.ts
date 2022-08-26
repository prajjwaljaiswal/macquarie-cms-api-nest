/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { dwInventoryListEntity } from './dw-inventory.entity';
import { dwInventoryWarrantsEntity } from './dw-inventory-warrants.entity';
import { UpdatedwInventoryDto } from './dw-inventory.dto';

@Injectable()
export class dwInventoryService {
  constructor(
    @InjectRepository(dwInventoryListEntity)
    private readonly dwInventoryListRepository: Repository<dwInventoryListEntity>,
    @InjectRepository(dwInventoryWarrantsEntity)
    private readonly dwInventoryWarrantsRepository: Repository<dwInventoryWarrantsEntity>,
  ) {}

  async getdwList(): Promise<dwInventoryListEntity[]> {
    const dwlists = await this.dwInventoryListRepository.query("select symbol, b.ric from mqwarrantscms.sold_out_list b left join mqwarrants.warrants_screener a on a.ticker=b.symbol COLLATE utf8_general_ci");
    var dwNewLists = [];

    let ric = "";

    if(dwlists[0]){
      for(let i = 0; i < dwlists.length; i++){
          ric += `'${dwlists[i].ric}',`;
      }

      ric = ric.slice(0, -1)

      var data = await this.dwInventoryListRepository.query(`Select s.ric,s.ticker,type,underlying_ticker,underlying_ric,premium,implied_volatility,delta,effective_gearing,sensitivity,breakeven_price,theta,intrinsic_value,exercise_price,percent_moneyness,moneyness,last_trading_date,maturity,wrnt_per_share,conv_ratio,i.code as issuer,j.list_date from mqwarrants.warrants_screener as s LEFT JOIN mqwarrants.warrants_issuers as i on i.issuer_name = s.issuer_name JOIN mqwarrants.warrants_issued_date as j on j.ric = s.ric where s.ric IN(${ric})`);


      for(let i = 0; i < dwlists.length; i++){
          dwNewLists[i] = {
              symbol: dwlists[i].symbol,
              ric: dwlists[i].ric,
              last_trading_date: data[i].last_trading_date
          }
      }

    }
    return dwNewLists;
  }

  async getdwListById(id){
    return await this.dwInventoryListRepository.find({
        where: { id: id }
      });
    }


  async insertdwListById(data){
    return await this.dwInventoryListRepository.query(`INSERT INTO mqwarrantscms.sold_out_list (symbol, ric) values("${data.symbol}", "${data.ric}")`)
  }


  async deletedwInventoryBysymbol(symbol: any) {

    const symbols = Object.values(symbol);
    console.log(symbols);

    var str:string = ""
    if(symbols[0]){
      for(let i = 0; i < symbols.length; i++){
        str += `'${symbols[i]}',`;
      }


      str = str.slice(0, -1)
      console.log(str);

    return await this.dwInventoryListRepository.query(`delete from mqwarrantscms.sold_out_list where symbol IN(${str})`)
  }

  }

  async updatedwListById(id, data){
        data.image = data.image ? Buffer.from(data.image) : null;
        return await this.dwInventoryListRepository
        .createQueryBuilder()
        .update(dwInventoryListEntity)
        .set({
          ...data,
          image: data.image
        })
        .where("id = :id", {id})
        .execute();
    }

  // async updatedwInventoryWarrants(data: UpdatedwInventoryDto): Promise<UpdateResult> {
  //   const cleardwInventory = await this.dwInventoryWarrantsRepository.createQueryBuilder()
  //     .update()
  //     .set({
  //       future_ric: '',
  //       future_dsply_name: '',
  //     })
  //     .where('future_ric = :future_ric', { future_ric: data.future_ric })
  //     .execute();
  //   return data.rics.length === 0
  //     ? cleardwInventory
  //     : await this.dwInventoryWarrantsRepository.createQueryBuilder()
  //         .update()
  //         .set({
  //           future_ric: data.future_ric,
  //           future_dsply_name: data.future_dsply_name,
  //         })
  //         .where('wrnt_ric in (:...rics)', { rics: data.rics })
  //         .execute();
  // }
}
