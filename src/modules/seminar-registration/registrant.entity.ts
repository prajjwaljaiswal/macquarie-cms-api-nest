import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'registrant' })
export class RegEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  passwd: string;

  @Column()
  regdate: Date;

  @Column()
  status: string;

  @Column()
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
  regoin: string;

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

  @Column()
  regmailcontent: string;

  @Column()
  forgetmailcontent: string;

  @Column()
  changemailcontent: string;

  @Column({ type: 'tinyint' })
  edm_smnr: number;

  @Column({ type: 'tinyint' })
  edm_mkrtng: number;
}
