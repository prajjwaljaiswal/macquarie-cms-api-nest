import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mq_email_info' })
export class NewsletterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column()
  status: number;

  @Column()
  img_id: number;

  @Column({ type: 'text' })
  img_link: string;

  @Column()
  last_update: Date;

  @Column()
  option: string;

  @Column()
  news_img_id: number;
}
