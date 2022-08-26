import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { warrants_screener } from "../power-search/warrants_screener.entity";
import { WatchlistController } from "./watchlist.controller";
import { WatchListEntitity } from "./watchlist.entitiy";
import { WatchListService } from "./watchlist.service";

@Module({
  controllers: [WatchlistController],
  providers: [WatchListService],
    imports: [TypeOrmModule.forFeature([WatchListEntitity]),
    TypeOrmModule.forFeature(
      [WatchListEntitity],
      process.env.WARRANTS_DB_CONN_NAME,
    ),
  ]
})


export class WatchListModule {}