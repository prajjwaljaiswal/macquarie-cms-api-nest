import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'index_future_warrants' })
export class IFWarrantsEntity {
  @PrimaryColumn()
  wrnt_ric: string;

  @Column()
  ticker: string;

  @Column()
  dsply_nmll: string;

  @Column()
  future_ric: string;

  @Column()
  stock_dsply_name: string;

  @Column()
  future_dsply_name: string;

  @Column()
  maturity: Date;
}
