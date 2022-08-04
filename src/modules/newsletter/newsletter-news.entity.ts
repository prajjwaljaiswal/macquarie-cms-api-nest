import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'newsletter_news' })
export class NewsletterNewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longblob' })
  image: Buffer;

  @Column({ type: 'text' })
  link: string;
}
