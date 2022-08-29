import { 
    Bind,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
 } from '@nestjs/common';

 import { DailyHsiDwService } from './dailyHsiUpdate.service';
import { createDailyHsiDwDto, DailyHsiDwDto, DailyHsiDwImageDto } from './dailyHsiUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('daily-hsi-dw')
export class DailyHsiDwController {
    constructor(private readonly DailyHsiDwService: DailyHsiDwService) {}

    @Get()
   async findAll(){
        return await this.DailyHsiDwService.getTopPicks();
    }

    @Get('/:id')
    findById(@Param('id') id: number){
        return this.DailyHsiDwService.getTopPicksById(id);
    }

    @Post('/update')
    async update(@Body() DailyHsiDwDto: DailyHsiDwDto){
        try{
        const affected = await this.DailyHsiDwService.updateDailySP500(DailyHsiDwDto);

        if(affected){
            return { SUCCESS: true }
        }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insertDailySP500(@Body() createDailyHsiDwDto: createDailyHsiDwDto){
        try{
        const affected = await this.DailyHsiDwService.insertDailySP500(createDailyHsiDwDto);

        if(affected){
                return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number, @Res() res: Response, ){
        const buffer = await this.DailyHsiDwService.getImage(id);
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        res.set({
          'Content-Type': 'image/jpeg',
          'Content-Length': buffer.length,
        });
    
        stream.pipe(res);
    }


    @Post('upload/:id')
    // @UseInterceptors(FileInterceptor('file'))
    // @Bind(UploadedFile())
    async uploadFile(@Param('id') id: number, @Body() DailyHsiDwImageDto: DailyHsiDwImageDto) {
        const { image } = DailyHsiDwImageDto;
        try{
            const uploded = await this.DailyHsiDwService.updateImage({id, image});

            return { SUCCESS: true }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }



    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.DailyHsiDwService.deleteDailySP500(id)
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
