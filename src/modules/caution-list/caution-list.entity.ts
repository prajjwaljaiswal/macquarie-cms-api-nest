import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB, name: 'caution' })
export class CautionEntity {

  @PrimaryColumn()
  ticker: string;
  
  @Column()
  status: string;


}
