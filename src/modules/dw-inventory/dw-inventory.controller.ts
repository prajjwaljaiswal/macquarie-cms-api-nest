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
import { UpdatedwInventoryDto } from './dw-inventory.dto';
import { dwInventoryService } from './dw-inventory.service';

@Controller('dwInventory')
export class dwInventoryController {
  constructor(private readonly dwInventoryService: dwInventoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getdwList() {
    return await this.dwInventoryService.getdwList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getdwListById(@Param('id') id: number){
    return await this.dwInventoryService.getdwListById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:id')

  async updatedwListById(@Param('id') id: number, @Body() data: UpdatedwInventoryDto){
    try{
     await this.dwInventoryService.updatedwListById(id, data);
     return { SUCCESS: true }
  }catch(err){
    return { status: "failed", msg: err.message }
  }
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async insertdwListById(@Body() data: UpdatedwInventoryDto){
    try{
      await this.dwInventoryService.insertdwListById(data);
      return { SUCCESS: true }
    }catch(err){
      return { status: "failed", msg: err.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deletedwInventoryBysymbol(@Body() symbol){
    // console.log(symbol);
    try{
     await this.dwInventoryService.deletedwInventoryBysymbol(symbol);
     return { SUCCESS: true }
    }catch(err){
      return { status: "failed", msg: err.message }
    }
  }


}
