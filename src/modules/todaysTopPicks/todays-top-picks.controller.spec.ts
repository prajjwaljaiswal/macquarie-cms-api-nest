import { Test, TestingModule } from '@nestjs/testing';
import { TodaysTopPicksController } from './todays-top-picks.controller';

describe('TodaysTopPicksController', () => {
  let controller: TodaysTopPicksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodaysTopPicksController],
    }).compile();

    controller = module.get<TodaysTopPicksController>(TodaysTopPicksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
