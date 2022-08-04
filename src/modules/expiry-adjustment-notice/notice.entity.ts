import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'expiry_adjustment_notices' })
export class NoticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  headline: string;

  @Column({ type: 'text' })
  underlying: string;

  @Column({ type: 'text' })
  related_warrant: string;

  @Column()
  file_name: string;

  @Column()
  file_location: number;

  @Column({ type: 'longblob' })
  pdf: Buffer;

  @Column()
  is_confirm: number;

  @Column()
  last_update_time: Date;
}
