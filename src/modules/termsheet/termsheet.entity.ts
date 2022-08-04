import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'termsheets_listing_docs' })
export class TermsheetEntity {
  @PrimaryColumn()
  ric: string;

  @PrimaryColumn()
  symbol: string;

  @Column({ type: 'longblob' })
  pdf: Buffer;

  @Column()
  file_name: string;

  @Column()
  last_update_time: Date;

  @Column()
  is_confirm: number;
}
