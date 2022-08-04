import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'newsletter_tips' })
export class NewsletterTipsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longblob' })
  image: Buffer;

  @Column({ type: 'text' })
  link: string;
}
