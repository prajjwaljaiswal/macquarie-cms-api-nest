import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeController } from './notice.controller';
import { NoticeEntity } from './notice.entity';
import { NoticeService } from './notice.service';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
  imports: [TypeOrmModule.forFeature([NoticeEntity])],
})
export class NoticeModule {}
