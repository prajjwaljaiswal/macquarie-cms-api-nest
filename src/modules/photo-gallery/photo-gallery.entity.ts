import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'photo_gallery_photo' })
export class PhotoGalleryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  last_update_time: Date;

  @Column()
  album_id: number;

  @Column({ type: 'longblob' })
  photo: Buffer;
}
