import { Test, TestingModule } from '@nestjs/testing';
import { PowerSearchController } from './power-search.controller';

describe('PowerSearchController', () => {
  let controller: PowerSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PowerSearchController],
    }).compile();

    controller = module.get<PowerSearchController>(PowerSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
