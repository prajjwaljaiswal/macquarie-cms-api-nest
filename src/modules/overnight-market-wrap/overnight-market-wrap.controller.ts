import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOMWDto, UpdateOMWDto } from './overnight-market-wrap.dto';
import { OMWService } from './overnight-market-wrap.service';

@Controller('omw')
export class OMWController {
  constructor(private readonly OMWService: OMWService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getGAList() {
    return this.OMWService.getOMWList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:Id')
  getGAById(@Param('Id', new ParseIntPipe()) Id: number) {
    return this.OMWService.getOMWById(Id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOMW(@Body() data: CreateOMWDto) {
    return this.OMWService.createOMW(data)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to insert',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateOMW(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: UpdateOMWDto,
  ) {
    return this.OMWService.updateOMW(data, id)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to update',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteOMW(@Param('id', new ParseIntPipe()) id: number) {
    return this.OMWService.deleteOMW(id)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
            MESSAGE: 'Failed to delete',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
