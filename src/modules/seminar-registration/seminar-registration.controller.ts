import {
  Body,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateSeminarRegdto } from './seminar-registration.dto';
import { SeminarRegService } from './seminar-registration.service';

@Controller('seminarreg')
export class SeminarRegController {
  constructor(private readonly SeminarRegServcie: SeminarRegService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getSeminarRegList(@Param('id', new ParseIntPipe()) id: number) {
    return this.SeminarRegServcie.getSeminarRegList(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  insertSeminarReg(@Body() body: UpdateSeminarRegdto) {
    return this.SeminarRegServcie.insertSeminarReg(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            MESSAGE: 'Failed to Update Seminar Registration',
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  deleteSeminarReg(@Body() body: UpdateSeminarRegdto) {
    return this.SeminarRegServcie.deleteSeminarReg(body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          {
            MESSAGE: 'Failed to Remove Seminar Registration',
            SUCCESS: false,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
