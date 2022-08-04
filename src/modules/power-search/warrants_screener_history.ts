/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class warrants_screener_history {
  @Column()
  ric: string;

  @PrimaryColumn()
  ticker: string;

  @Column()
  dsply_name: string;

  @Column()
  dsply_nmll: string;

  @Column()
  exchange_code: string;

  @Column()
  currency: string;

  @Column()
  issuer_name: string;

  @Column()
  type: string;

  @Column()
  underlying_ric: string;

  @Column()
  underlying_ticker: string;

  @Column()
  underlying_name: string;

  @Column()
  maturity: Date;

  @Column()
  b_trbc_business: number;

  @Column()
  premium: number;

  @Column()
  implied_volatility: number;

  @Column()
  delta: number;

  @Column()
  effective_gearing: number;

  @Column()
  sensitivity: number;

  @Column()
  breakeven_price: number;

  @Column()
  theta: number;

  @Column()
  intrinsic_value: number;

  @Column()
  exercise_price: number;

  @Column()
  conv_ratio: number;

  @Column()
  wrnt_per_share: number;

  @Column()
  moneyness: number;

  @Column()
  percent_moneyness: number;

  @Column()
  underlying_price: number;

  @Column()
  underlying_bid: number;

  @Column()
  underlying_curr: string;

  @Column()
  warrant_price: number;

  @Column()
  last_trading_date: Date;

  @Column()
  turnover: number;

  @Column()
  TRDPRC_1: number;

  @Column()
  BIDSIZE: number;

  @Column()
  BID: number;

  @Column()
  ASK: number;

  @Column()
  ASKSIZE: number;

  @Column()
  ACVOL_1: number;

  @Column()
  PCTCHNG: number;

  @Column()
  NETCHNG_1: number;

  @Column()
  BID_PCTCHNG: number;

  @Column()
  BID_NETCHNG: number;

  @Column()
  OPEN_PRC: number;

  @Column()
  HIGH_1: number;

  @Column()
  LOW_1: number;

  @Column()
  HST_CLOSE: number;

  @Column()
  HSTCLSDATE: Date;

  @Column()
  underlying_price_adj: number;

  @Column()
  exercise_price_adj: number;

  @UpdateDateColumn()
  update_time: Date;
}
