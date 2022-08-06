import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'market_commentary' })
export class MarketComentryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publish_date: Date;

  @Column()
  en_title: string;

  @Column()
  thai_title: string;

  @Column()
  en_short_content: string;

  @Column()
  thai_short_content: string;

  @Column()
  en_full_content: string;

  @Column()
  thai_full_content: string;
}
