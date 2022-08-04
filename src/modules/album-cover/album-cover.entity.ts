import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photo_gallery_album' })
export class AlbumCoverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  en_title: string;

  @Column()
  th_title: string;

  @Column({ type: 'text' })
  en_description: string;

  @Column({ type: 'text' })
  th_description: string;

  @Column()
  last_update_time: Date;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'longblob' })
  cover: Buffer;
}
