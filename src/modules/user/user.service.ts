import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mqwarrants_login } from './mqwarrants_login.entity';
import { mqwarrants_login_history } from './mqwarrants_login_history.entity';
import { ResetPassworddto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(mqwarrants_login)
    private usersRepository: Repository<mqwarrants_login>,
    @InjectRepository(mqwarrants_login_history)
    private historyRepository: Repository<mqwarrants_login_history>,
  ) {}

  async findOne(login_id: string): Promise<mqwarrants_login | undefined> {
    return await this.usersRepository.findOne({ login_id });
  }

  async ResetPassword(data: ResetPassworddto): Promise<any> {
    const findUser = await this.usersRepository.count({
      where: { login_id: data.login_id, password: data.password },
    });
    if (findUser > 0) {
      const historyPW = await this.historyRepository
        .createQueryBuilder('h')
        .select('h.password')
        .where('h.login_id = :user', { user: data.login_id })
        .orderBy('h.update_time', 'DESC')
        .limit(10)
        .getMany();

      historyPW.map((d: any) => {
        if (d.password === data.newPassword) {
          throw new Error(
            'New password cannot be same as your recent password. Please choose a new password.',
          );
        }
      });

      await this.usersRepository
        .createQueryBuilder()
        .update()
        .set({
          password: data.newPassword,
          update_time: new Date(),
        })
        .where('login_id = :user', { user: data.login_id })
        .execute();

      return await this.historyRepository
        .createQueryBuilder()
        .insert()
        .values({
          login_id: data.login_id,
          password: data.newPassword,
          update_time: new Date(),
        })
        .execute();
    } else {
      throw new Error('Old password is not correct');
    }
  }
}
