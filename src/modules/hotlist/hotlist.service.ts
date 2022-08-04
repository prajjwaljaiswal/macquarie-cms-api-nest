/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { warrants_screener } from '../power-search/warrants_screener.entity';
import { dw_hot_list } from './dw_hot_list.entity';
@Injectable()
export class HotlistService {
  constructor(
    @InjectRepository(dw_hot_list)
    private readonly hostListRepository: Repository<dw_hot_list>,
    @InjectRepository(warrants_screener, process.env.WARRANTS_DB_CONN_NAME)
    private readonly wsRepository: Repository<warrants_screener>,
  ) {}

  //db.getDWHotList=SELECT category,id,h.ric,ticker,s.type FROM mqwarrantscms_sg.dw_hot_list h left join mqwarrants.warrants_screener s on h.ric = s.ric order by category,id;




  async find(): Promise<dw_hot_list[]> {

    let shortname = function(str1) {
      var split_names = str1.trim().split(" ");
      if (split_names.length == 2) {
          return (split_names[0].charAt(0) + "" + split_names[1].charAt(0));
      }
      if (split_names.length == 3) {
          return (split_names[0].charAt(0) + "" + split_names[1].charAt(0)+ "" + split_names[2].charAt(0)+ "" + split_names[1].charAt(0));
      }
      if (split_names.length == 4) {
          return (split_names[0].charAt(0) + "" + split_names[1].charAt(0)+ "" + split_names[2].charAt(0)+ "" + split_names[3].charAt(0)+ "" + split_names[1].charAt(0));
      }
      return split_names[0];
    }
    // console.log('query');
    let vars = await this.hostListRepository
    .createQueryBuilder('dw')
    .leftJoinAndSelect(warrants_screener, 'w', 'w.ric = dw.ric')
    .select([
      'dw.category as category',
      'dw.id as id',
      'dw.ric as ric',
      'w.ticker as ticker',
      'w.type as type',
    ])
    .orderBy('category', 'ASC')
    // .addOrderBy('category')
    .getRawMany();


    let data = [];
    vars.map(function(num) {

        let arr = {};
        arr['category'] = num.category;
        arr['categoryfull'] = num.category;
        arr['id'] = num.id;
        arr['ric'] = num.ric;
        arr['ticker'] =num.ticker;
        arr['type'] =num.type;
        data.push(arr);

    })
    vars = data;
    return vars;
    
}


  //update mqwarrantscms_sg.dw_hot_list set ric=? where category=? and id=?;
  async updateHotlist(ric: string, payload: any): Promise<any> {
    console.log(payload);
    
    const hotlist = await this.hostListRepository.findOne({
      id: payload?.id,
      category: payload?.category,
    });
    console.log('hot list',hotlist);
    if (hotlist) {
      let idd = hotlist.id;
      let catd = hotlist.category;
      console.log('ssss',idd);
      await this.hostListRepository
      .createQueryBuilder()
      .delete()
      .where('category = :category and id = :id', {
        category:catd, 
        id:idd
      })
      .execute();


      const newList = new dw_hot_list();
      newList.ric = ric;
      newList.category = payload.category;
      newList.id = payload.id;
      newList.modify_time = null;

      console.log('newhot:', newList);

      return await this.hostListRepository.save(newList);
      
      //  return await this.hostListRepository.createQueryBuilder()
      // .update()
      // .set({ric:hotlist.ric, modify_time:null })
      // .where('id = :id', { id: hotlist.id })
      // .execute();
      //return await this.hostListRepository.save(hotlist);
    } else {
      console.log('payload',payload);

      let idd = payload.id;
      let catd = payload.category
      console.log('else',idd);
      await this.hostListRepository
      .createQueryBuilder()
      .delete()
      .where('category = :category and id = :id', {
        category:catd, 
        id:idd
      })
      .execute();

      return await this.hostListRepository.createQueryBuilder()
      .insert()
      .values({
        ric:ric,
        category : payload.category,
        id : payload.id,
        modify_time: new Date(),
      })
      .execute();


      // const newList = new dw_hot_list();
      // console.log('newlist',newList);
      
      // newList.ric = ric;
      // newList.category = payload.category;
      // newList.id = payload.id;
      // newList.modify_time = null;

      // console.log('newhot:', newList);

      // return await this.hostListRepository.save(newList);
    }
  }

  //delete from mqwarrantscms_sg.dw_hot_list where category=? and id=?;
  async deleteHotListItem(category: string, id: number): Promise<any> {
    console.log(category, id);
    const deletedRecord = await this.hostListRepository
      .createQueryBuilder()
      .delete()
      .where('category = :category and id = :id', {
        category,
        id,
      })
      .execute();
    return deletedRecord;
  }
}
