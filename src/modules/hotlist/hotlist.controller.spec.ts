import { Test, TestingModule } from '@nestjs/testing';
import { HotlistController } from './hotlist.controller';

describe('HotlistController', () => {
  let controller: HotlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotlistController],
    }).compile();

    controller = module.get<HotlistController>(HotlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
