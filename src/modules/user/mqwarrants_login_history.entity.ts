import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'mqwarrants_login_history' })
export class mqwarrants_login_history {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column()
  update_time: Date;
}
