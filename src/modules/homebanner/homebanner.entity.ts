/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'add_home_banner' })
export class HomeBannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({ type: 'longblob', default: null })
  image: Buffer;

  @Column({ type: 'text' })
  link: string;

  @Column()
  last_update_time: Date;
}
