import { Test, TestingModule } from '@nestjs/testing';
import { RegistrantService } from './registrant.service';

describe('RegistrantService', () => {
  let service: RegistrantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrantService],
    }).compile();

    service = module.get<RegistrantService>(RegistrantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
