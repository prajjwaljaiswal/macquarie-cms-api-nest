import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsheetController } from './termsheet.controller';
import { TermsheetEntity } from './termsheet.entity';
import { TermsheetService } from './termsheet.service';

@Module({
  controllers: [TermsheetController],
  providers: [TermsheetService],
  imports: [TypeOrmModule.forFeature([TermsheetEntity])],
})
export class TermsheetModule {}
