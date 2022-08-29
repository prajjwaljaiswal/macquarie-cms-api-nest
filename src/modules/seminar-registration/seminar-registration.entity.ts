import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB,name: 'seminar_registration' })
export class SeminarRegEntity {
  @PrimaryColumn()
  seminar_id: number;

  @PrimaryColumn()
  user_id: string;

  @Column()
  registration_time: Date;

  @Column({ default: '0' })
  mailstatus: number;

  @Column({ default: null })
  mail_content: string;
}
