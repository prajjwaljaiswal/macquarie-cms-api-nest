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
import { CreateMarketComentryDto, UpdateMarketComentryDto } from './market-commentary.dto';
import { MarketComentryService } from './market-commentary.service';

@Controller('market-commentary')
export class MarketComentryController {
  constructor(private readonly MarketComentryService: MarketComentryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getGAList() {
    return this.MarketComentryService.getMarketComentryList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:Id')
  getGAById(@Param('Id', new ParseIntPipe()) Id: number) {
    return this.MarketComentryService.getMarketComentryById(Id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createMarketComentry(@Body() data: CreateMarketComentryDto) {
    return this.MarketComentryService.createMarketComentry(data)
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
  updateMarketComentry(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: UpdateMarketComentryDto,
  ) {
    return this.MarketComentryService.updateMarketComentry(data, id)
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
  deleteMarketComentry(@Param('id', new ParseIntPipe()) id: number) {
    return this.MarketComentryService.deleteMarketComentry(id)
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
