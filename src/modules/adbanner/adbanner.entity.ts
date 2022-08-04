import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'adbanner' })
export class AdBannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({ type: 'longblob', default: null })
  image: Buffer;

  @Column({ type: 'text' })
  link: string;

  @Column()
  alt_en: string;

  @Column()
  alt_th: string;

  @Column({ type: 'tinyint' })
  redirect_type: number;

  @Column()
  last_update_time: Date;
}
