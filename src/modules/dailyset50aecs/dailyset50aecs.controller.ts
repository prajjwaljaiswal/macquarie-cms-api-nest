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

 import { DailySet50AecsService } from './dailyset50aecs.service';
import { createDailySet50AecsDto, DailySet50AecsDto, DailySet50AecsImageDto } from './dailyset50aecs.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('daily-set50-aecs')
export class DailySet50AecsController {
    constructor(private readonly DailySet50AecsService: DailySet50AecsService) {}

    @Get()
   async findAll(){
        return await this.DailySet50AecsService.getTopPicks();
    }

    @Get('/:id')
    findById(@Param('id') id: number){
        return this.DailySet50AecsService.getTopPicksById(id);
    }

    @Post('/update')
    async update(@Body() DailySet50AecsDto: DailySet50AecsDto){
        try{
        const affected = await this.DailySet50AecsService.updateDailySP500(DailySet50AecsDto);

        if(affected){
            return { SUCCESS: true }
        }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insertDailySP500(@Body() createDailySet50AecsDto: createDailySet50AecsDto){
        try{
        const affected = await this.DailySet50AecsService.insertDailySP500(createDailySet50AecsDto);

        if(affected){
                return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number, @Res() res: Response, ){
        const buffer = await this.DailySet50AecsService.getImage(id);
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
    async uploadFile(@Param('id') id: number, @Body() DailySet50AecsImageDto: DailySet50AecsImageDto) {
        const { image } = DailySet50AecsImageDto;
        try{
            const uploded = await this.DailySet50AecsService.updateImage({id, image});

            return { SUCCESS: true }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }



    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.DailySet50AecsService.deleteDailySP500(id)
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
