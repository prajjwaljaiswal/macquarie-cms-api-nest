/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PowerSearchService } from './power-search.service';

describe('PowerSearchService', () => {
  let service: PowerSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowerSearchService],
    }).compile();

    service = module.get<PowerSearchService>(PowerSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
