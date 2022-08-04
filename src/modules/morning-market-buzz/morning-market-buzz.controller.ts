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
import { CreateMMBDto, UpdateMMBDto } from './morning-market-buzz.dto';
import { MMBService } from './morning-market-buzz.service';

@Controller('mmb')
export class MMBController {
  constructor(private readonly MMBService: MMBService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMMBList() {
    return this.MMBService.getMMBList();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/latest')
  getLatestTitle() {
    return this.MMBService.getLatestTitle();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:Id')
  getMMBById(@Param('Id', new ParseIntPipe()) Id: number) {
    return this.MMBService.getMMBById(Id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createMMB(@Body() data: CreateMMBDto) {
    return this.MMBService.createMMB(data)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((err) => {
        console.log(err);
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
  updateMMB(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: UpdateMMBDto,
  ) {
    return this.MMBService.updateMMB(data, id)
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
  deleteMMB(@Param('id', new ParseIntPipe()) id: number) {
    return this.MMBService.deleteMMB(id)
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
