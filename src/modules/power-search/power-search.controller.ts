/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PowerSearchDTO } from './power-search.dto';
import { PowerSearchService } from './power-search.service';

@Controller('power-search')
export class PowerSearchController {
  constructor(private powerSearchService: PowerSearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHotList(@Query() powerSearchDTO: PowerSearchDTO) {
    return this.powerSearchService.find(powerSearchDTO);
  }

  @Get('symbol')
  async searchSymbol(@Query() powerSearchDTO: PowerSearchDTO) {
    return this.powerSearchService.searchSymbol(powerSearchDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/underlying')
  getUnderlyings() {
    return this.powerSearchService.getUnderlyings();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/warrants')
  getWarrants() {
    return this.powerSearchService.getWarrants();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/warrants_history')
  getWarrants_history() {
    return this.powerSearchService.getWarrants_history();
  }
}
