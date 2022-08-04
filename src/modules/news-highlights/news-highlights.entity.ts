import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB, name: 'daily_highlight' })
export class NewsHighlightsEntity {

  @PrimaryColumn()
  id: number;
  
  @Column()
  daily_highlight_status: number;

  @Column()
  publish_date: Date;

  @Column()
  en_title: string;

  @Column()
  thai_title: string;

  @Column()
  en_short_content: string;

  @Column()
  thai_short_content: string;

  @Column()
  en_full_content: string;

  @Column()
  thai_full_content: string;


}
