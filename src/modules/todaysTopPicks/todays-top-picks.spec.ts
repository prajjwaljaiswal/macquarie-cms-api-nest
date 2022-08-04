import { Test, TestingModule } from '@nestjs/testing';
import { TodaysTopPicks } from './todays-top-picks';

describe('TodaysTopPicks', () => {
  let provider: TodaysTopPicks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodaysTopPicks],
    }).compile();

    provider = module.get<TodaysTopPicks>(TodaysTopPicks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
