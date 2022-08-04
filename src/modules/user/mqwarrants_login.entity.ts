import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class mqwarrants_login {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column({ type: 'datetime' })
  reset_time: Date;

  @Column()
  user_status: string;

  @Column()
  try_password: number;

  @Column()
  mail: string;

  @Column()
  auth: string;

  @Column({ type: 'datetime' })
  auth_time: Date;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
