import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB, name: 'seminar_new' })
export class SeminarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  seminar_date: string;

  @Column()
  en_seminar_time: string;

  @Column()
  th_seminar_time: string;

  @Column({ default: '0' })
  sign_up: number;

  @Column({ default: '0' })
  sign_up_limit: number;

  @Column()
  last_update_time: Date;

  @Column({ default: null })
  seminar_status: string;

  @Column()
  en_title: string;

  @Column()
  th_title: string;

  @Column({ default: null })
  en_partner: string;

  @Column({ default: null })
  th_partner: string;

  @Column({ default: null })
  en_venue: string;

  @Column({ default: null })
  th_venue: string;

  @Column()
  en_introduce_content: string;

  @Column()
  th_introduce_content: string;

  @Column({ type: 'longblob', default: null })
  en_poster: Buffer;

  @Column({ type: 'longblob', default: null })
  th_poster: Buffer;

  @Column({ default: null })
  registration_link: string;

  @Column({ default: '0' })
  webinar: string;

  @Column({ default: '0' })
  recorded: string;
}
