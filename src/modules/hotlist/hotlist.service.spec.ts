import { Test, TestingModule } from '@nestjs/testing';
import { HotlistService } from './hotlist.service';

describe('HotlistService', () => {
  let service: HotlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotlistService],
    }).compile();

    service = module.get<HotlistService>(HotlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
