import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoGalleryController } from './photo-gallery.controller';
import { PhotoGalleryEntity } from './photo-gallery.entity';
import { PhotoGalleryService } from './photo-gallery.service';

@Module({
  controllers: [PhotoGalleryController],
  providers: [PhotoGalleryService],
  imports: [TypeOrmModule.forFeature([PhotoGalleryEntity])],
})
export class PhotoGalleryModule {}
