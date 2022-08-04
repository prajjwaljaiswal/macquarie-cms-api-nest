import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB , name: 'top_pick_list' })
export class TodaysTopPicksEntity {

  @PrimaryColumn()
  id: number;
  
  @PrimaryColumn()
  symbol: string;

  @Column()
  top_pick_status: string;

  @Column()
  time_scale: string;

  @Column()
  top_pick_order: number;

  @Column()
  update_date: Date

  @Column()
  en_content: string

  @Column()
  thai_content: string


}
