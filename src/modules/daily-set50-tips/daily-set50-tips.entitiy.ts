import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB , name: 'dw_tips_dw_set50' })
export class DailySet50TipsEntity {

  @Column()
  id: number;
  
  @PrimaryColumn()
  dw_tips_status: number;

  @Column()
  publish_date: Date;

  @Column()
  en_title: string;

  @Column()
  thai_title: string;
  
  @Column()
  en_full_content: string

  @Column()
  thai_full_content: string

  @Column({ type: 'longblob' })
  image: Buffer


}


export class DailySet50TipsUpdateEntity{

  @Column()
  daily_sp500_status: number;

  @Column()
  publish_date: Date;

  @Column()
  en_title: string;

  @Column()
  thai_title: string;

  @Column()
  en_short_content: string;

  @Column()
  thai_short_content: string

  
  @Column()
  en_full_content: string

  @Column()
  thai_full_content: string

}

export class DailySet50TipsImageEntity{
  @Column()
  id: number;
  
  @Column({ type: 'longblob' })
  image: Buffer;
}
