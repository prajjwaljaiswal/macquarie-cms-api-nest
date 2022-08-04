import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'future_chain_sg' })
export class IFListEntity {
  @PrimaryColumn()
  ric: string;

  @Column()
  dsply_name: string;

  @Column()
  dsply_nmll: string;

  @Column()
  underlying_ticker: string;

  @Column()
  EXPIR_DATE: Date;
}
