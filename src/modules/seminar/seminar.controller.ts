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
import { CreateSeminardto, UpdateSeminardto } from './seminar.dto';
import { SeminarService } from './seminar.service';

@Controller('seminar')
export class SeminarController {
  constructor(private readonly SeminarService: SeminarService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/reglist')
  getEnabledSeminar() {
    return this.SeminarService.getEnabledSeminar();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getSeminar() {
    return this.SeminarService.getSeminar();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSeminarById(@Param('id', new ParseIntPipe()) id: number) {
    try{
      return await this.SeminarService.getSeminarById(id);
    }catch(err){
        return err.message;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createSeminar(@Body() body: CreateSeminardto) {
    return this.SeminarService.createSeminar(body)
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
            MESSAGE: err.message,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateSeminar(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateSeminardto,
  ) {
    return this.SeminarService.updateSeminar(id, body)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch((err) => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: err.message,
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteSeminar(@Param('id', new ParseIntPipe()) id: number) {
    return this.SeminarService.deleteSeminar(id)
      .then(() =>
        JSON.stringify({
          SUCCESS: true,
        }),
      )
      .catch(() => {
        throw new HttpException(
          {
            SUCCESS: false,
            MESSAGE: 'Failed to delete Seminar',
            STATUSCODE: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
