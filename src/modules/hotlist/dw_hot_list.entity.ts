import { Entity, Column, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity({ database: process.env.MQ_DB, name: 'dw_hot_list' })
export class dw_hot_list {
  @PrimaryColumn()
  id: number;

  @Column()
  category: string;

  @PrimaryColumn()
  ric: string;

  @UpdateDateColumn()
  modify_time: Date;
}
