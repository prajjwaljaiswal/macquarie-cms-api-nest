import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB, name: 'fast_track' })
export class FastTrackEntity {

  @PrimaryColumn()
  ticker: string;
  
  @Column()
  status: string;


}
