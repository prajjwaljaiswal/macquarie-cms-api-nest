import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateSeminardto, UpdateSeminardto } from './seminar.dto';
import { SeminarEntity } from './seminar.entity';

@Injectable()
export class SeminarService {
  constructor(
    @InjectRepository(SeminarEntity)
    private readonly SeminarReposity: Repository<SeminarEntity>,
  ) {}

  async getEnabledSeminar(): Promise<SeminarEntity[]> {
    return await this.SeminarReposity.find({
      select: ['id', 'en_title', 'sign_up_limit'],
      where: { seminar_status: 'Y' },
    });
  }

  async getSeminar(): Promise<SeminarEntity[]> {
    return await this.SeminarReposity.find({
      select: [
        'id',
        'en_seminar_time',
        'en_title',
        'seminar_date',
        'sign_up_limit',
        'seminar_status',
      ],
      order: { id: 'DESC' },
    });
  }

  async getSeminarById(id: number): Promise<SeminarEntity> {
    return await this.SeminarReposity.findOne({
      select: [
        'id',
        'en_seminar_time',
        'en_title',
        'seminar_date',
        'sign_up_limit',
        'seminar_status',
        'en_introduce_content',
        'en_partner',
        'en_venue',
        'webinar',
        'recorded',
        'registration_link',
      ],
      where: { id: id },
    });
  }

  async createSeminar(data: CreateSeminardto): Promise<InsertResult> {
    let arraybuffer = data.en_poster ? Buffer.from(data.en_poster) : null;
    return await this.SeminarReposity.createQueryBuilder()
      .insert()
      .values({
        ...data,
        last_update_time: new Date(),
        en_poster: arraybuffer,
      })
      .execute();
  }

  async updateSeminar(
    id: number,
    data: UpdateSeminardto,
  ): Promise<UpdateResult> {
    if (data.en_poster === null) {
      delete data.en_poster;
      delete data.th_poster;
    } else {
      data.en_poster = Buffer.from(data.en_poster);
    }
    return await this.SeminarReposity.createQueryBuilder()
      .update()
      .set({ ...data, last_update_time: new Date() })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteSeminar(id: number): Promise<DeleteResult> {
    return await this.SeminarReposity.createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
}
