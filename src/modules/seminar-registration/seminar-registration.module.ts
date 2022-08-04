import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeminarRegController } from './seminar-registration.controller';
import { SeminarRegEntity } from './seminar-registration.entity';
import { SeminarRegService } from './seminar-registration.service';
import { RegEntity } from './registrant.entity';

@Module({
  controllers: [SeminarRegController],
  providers: [SeminarRegService],
  imports: [TypeOrmModule.forFeature([SeminarRegEntity, RegEntity])],
})
export class SeminarRegModule {}
