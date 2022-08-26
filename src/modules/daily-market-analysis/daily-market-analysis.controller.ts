import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatedailyMarketAnalysisDto } from './daily-market-analysis.dto';
import { dailyMarketAnalysisService } from './daily-market-analysis.service';

@Controller('DailyMarketAnalysis')
export class dailyMarketAnalysisController {
  constructor(private readonly dailyMarketAnalysisService: dailyMarketAnalysisService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getdwList() {
    return await this.dailyMarketAnalysisService.getdwList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getdwListById(@Param('id') id: number){
    return await this.dailyMarketAnalysisService.getdwListById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:id')

  async updatedwListById(@Param('id') id: number, @Body() data: UpdatedailyMarketAnalysisDto){
    try{
     await this.dailyMarketAnalysisService.updatedwListById(id, data);
     return { SUCCESS: true }
  }catch(err){
    return { status: "failed", msg: err.message }
  }
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async insertdwListById(@Body() data: UpdatedailyMarketAnalysisDto){
    try{
      await this.dailyMarketAnalysisService.insertdwListById(data);
      return { SUCCESS: true }
    }catch(err){
      return { status: "failed", msg: err.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  async deletedwListByid(@Param('id') id: number){
    try{
     await this.dailyMarketAnalysisService.deletedwListByid(id);
     return { SUCCESS: true }
    }catch(err){
      return { status: "failed", msg: err.message }
    }
  }


}
