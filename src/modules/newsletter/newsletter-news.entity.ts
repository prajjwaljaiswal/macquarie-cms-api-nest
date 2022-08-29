import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({database: process.env.MQ_DB, name: 'mq_email_info' })
export class NewsletterNewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longblob' })
  image: Buffer;

  @Column({ type: 'text' })
  img_link: string;
}
