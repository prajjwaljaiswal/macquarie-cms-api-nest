import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'daily_market_analysis' })
export class dailyMarketAnalysisListEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  publish_date: string;

  @Column()
  en_title: string;

  @Column()
  thai_title: string;

  @Column()
  link: string;

  @Column({ type: 'longblob' })
  image: Buffer
}
