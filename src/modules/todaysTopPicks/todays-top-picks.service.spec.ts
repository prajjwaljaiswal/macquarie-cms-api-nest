import { Test, TestingModule } from '@nestjs/testing';
import { TodaysTopPicksService } from './todays-top-picks.service';

describe('TodaysTopPicksService', () => {
  let service: TodaysTopPicksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodaysTopPicksService],
    }).compile();

    service = module.get<TodaysTopPicksService>(TodaysTopPicksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
