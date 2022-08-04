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
import { TermsheetService } from './termsheet.service';
import { CreateTSdto, UpdateTSdto } from './termsheet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('termsheet')
export class TermsheetController {
  constructor(private readonly TermsheetService: TermsheetService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/pending')
  getPending() {
    return this.TermsheetService.getPending();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/confirmed')
  getConfirmed() {
    return this.TermsheetService.getConfirmed();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTS(@Body() body: CreateTSdto) {
    return this.TermsheetService.createTS(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            MESSAGE: 'Failed to insert Termsheet',
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:ticker')
  updateTS(@Param('ticker') ticker: string, @Body() body: UpdateTSdto) {
    return this.TermsheetService.updateTS(ticker, body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            message: 'Failed to update Termsheet',
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:ticker')
  deleteTS(@Param('ticker') ticker: string) {
    return this.TermsheetService.deleteTS(ticker)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            MESSAGE: 'Failed to remove Termsheet',
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
