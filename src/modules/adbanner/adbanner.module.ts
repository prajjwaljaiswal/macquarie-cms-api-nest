import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdBannerController } from './adbanner.controller';
import { AdBannerEntity } from './adbanner.entity';
import { AdBannerService } from './adbanner.service';

@Module({
  controllers: [AdBannerController],
  providers: [AdBannerService],
  imports: [TypeOrmModule.forFeature([AdBannerEntity])],
})
export class AdBannerModule {}
