import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dw28' })
export class dwInventoryListEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  publish_date: string;

  @Column()
  en_title: string;

  @Column()
  thai_title: string;

  @Column({ type: 'longblob' })
  image: Buffer
}
