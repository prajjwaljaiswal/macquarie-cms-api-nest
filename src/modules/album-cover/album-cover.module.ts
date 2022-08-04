import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumCoverController } from './album-cover.controller';
import { AlbumCoverEntity } from './album-cover.entity';
import { AlbumCoverService } from './album-cover.service';

@Module({
  controllers: [AlbumCoverController],
  providers: [AlbumCoverService],
  imports: [TypeOrmModule.forFeature([AlbumCoverEntity])],
})
export class AlbumCoverModule {}
