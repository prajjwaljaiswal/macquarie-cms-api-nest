import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB, name: 'index_future_warrants' })
export class IFWarrantsEntity {
  @PrimaryColumn()
  wrnt_ric: string;

  @Column()
  ticker: string;

  @Column()
  future_ric: string;

  @Column()
  stock_dsply_name: string;

  @Column()
  future_dsply_name: string;

  @Column()
  maturity: Date;
}
