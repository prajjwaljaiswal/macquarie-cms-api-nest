/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'topbanner' })
export class HomeBannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longblob', default: null })
  desktop_image: Buffer;

  @Column({ type: 'longblob', default: null })
  mobile_image: Buffer;

  @Column({ type: 'text', default: null })
  desktop_link: string;

  @Column({ type: 'text' })
  mobile_link: string;
}
