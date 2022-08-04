import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class registrant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwd: string;

  @Column({ type: 'datetime' })
  regdate: Date;

  @Column({ type: 'datetime' })
  lastlogin: Date;

  @Column()
  skey: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  loginid: string;

  @Column()
  phone: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  source: string;

  @Column()
  stock: string;

  @Column()
  news: string;

  @Column()
  postcode: string;

  @Column()
  country: string;

  @Column()
  trade_method: string;

  @Column()
  language: string;

  @Column()
  mailstatus: number;

  @Column({ type: 'text' })
  regmailcontent: string;

  @Column({ type: 'text' })
  forgetmailcontent: string;

  @Column({ type: 'text' })
  changemailcontent: string;

  @Column()
  edm_smnr: number;

  @Column()
  edm_mkrtng: number;

  @Column({ default: true })
  isActive: boolean;
}
