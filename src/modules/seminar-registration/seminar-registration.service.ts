import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { RegEntity } from './registrant.entity';
import {
  GetSeminarRegdto,
  UpdateSeminarRegdto,
} from './seminar-registration.dto';
import { SeminarRegEntity } from './seminar-registration.entity';

@Injectable()
export class SeminarRegService {
  constructor(
    @InjectRepository(SeminarRegEntity)
    private readonly SeminarRegReposity: Repository<SeminarRegEntity>,
  ) {}

  async getSeminarRegList(id: number): Promise<GetSeminarRegdto[]> {
    return await this.SeminarRegReposity.createQueryBuilder('sr')
      .innerJoin(
        RegEntity,
        'r',
        'sr.user_id = r.loginid collate utf8_general_ci',
      )
      .select(['user_id', 'first_name', 'last_name', 'phone'])
      .addSelect('ROW_NUMBER() OVER(ORDER BY registration_time) AS id')
      .where('sr.seminar_id = :id', { id: id })
      .getRawMany();
  }

  async insertSeminarReg(data: UpdateSeminarRegdto): Promise<InsertResult> {
    return await this.SeminarRegReposity.createQueryBuilder()
      .insert()
      .values(data)
      .orUpdate({ overwrite: ['seminar_id'] })
      .execute();
  }

  async deleteSeminarReg(data: UpdateSeminarRegdto): Promise<DeleteResult> {
    return await this.SeminarRegReposity.createQueryBuilder()
      .delete()
      .where('user_id = :user_id AND seminar_id = :seminar_id', {
        user_id: data.user_id,
        seminar_id: data.seminar_id,
      })
      .execute();
  }
}
