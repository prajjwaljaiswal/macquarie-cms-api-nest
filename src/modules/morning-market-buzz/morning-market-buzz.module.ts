import { Module } from '@nestjs/common';
import { MMBService } from './morning-market-buzz.service';
import { MMBController } from './morning-market-buzz.controller';
import { MMBEntity } from './morning-market-buzz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MMBController],
  providers: [MMBService],
  imports: [TypeOrmModule.forFeature([MMBEntity])],
})
export class MMBModule {}
