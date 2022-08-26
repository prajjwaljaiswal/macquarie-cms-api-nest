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
import { Updatedw28updateDto } from './dw28-update.dto';
import { dw28updateService } from './dw28-update.service';

@Controller('Dw28Update')
export class dw28updateController {
  constructor(private readonly dw28updateService: dw28updateService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getdwList() {
    return await this.dw28updateService.getdwList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getdwListById(@Param('id') id: number){
    return await this.dw28updateService.getdwListById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:id')

  async updatedwListById(@Param('id') id: number, @Body() data: Updatedw28updateDto){
    try{
     await this.dw28updateService.updatedwListById(id, data);
     return { SUCCESS: true }
  }catch(err){
    return { status: "failed", msg: err.message }
  }
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async insertdwListById(@Body() data: Updatedw28updateDto){
    try{
      await this.dw28updateService.insertdwListById(data);
      return { SUCCESS: true }
    }catch(err){
      return { status: "failed", msg: err.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  async deletedwListByid(@Param('id') id: number){
    try{
     await this.dw28updateService.deletedwListByid(id);
     return { SUCCESS: true }
    }catch(err){
      return { status: "failed", msg: err.message }
    }
  }


}
