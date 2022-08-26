import { Column, Entity,PrimaryColumn } from 'typeorm';

@Entity({database: process.env.WARRANTS_DB })

export class WatchListEntitity {
    @PrimaryColumn()
    id: number;
}
