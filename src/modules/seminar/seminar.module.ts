import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeminarController } from './seminar.controller';
import { SeminarEntity } from './seminar.entity';
import { SeminarService } from './seminar.service';

@Module({
  controllers: [SeminarController],
  providers: [SeminarService],
  imports: [TypeOrmModule.forFeature([SeminarEntity])],
})
export class SeminarModule {}
