import { Test, TestingModule } from '@nestjs/testing';
import { RegistrantController } from './registrant.controller';

describe('RegistrantController', () => {
  let controller: RegistrantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrantController],
    }).compile();

    controller = module.get<RegistrantController>(RegistrantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
