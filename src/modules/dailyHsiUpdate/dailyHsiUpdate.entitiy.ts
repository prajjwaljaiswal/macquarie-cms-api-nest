import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB , name: 'daily_hsi' })
export class DailyHsiDwEntity {

  @Column()
  id: number;
  
  @PrimaryColumn()
  daily_hsi_status: number;

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

  @Column({ type: 'longblob' })
  image: Buffer


}


export class DailyHsiDwUpdateEntity{

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

export class DailyHsiDwImageEntity{
  @Column()
  id: number;
  
  @Column({ type: 'longblob' })
  image: Buffer;
}
