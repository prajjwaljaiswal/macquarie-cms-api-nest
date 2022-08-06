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

 import { DailySandpService } from './daily-sandp.service';
import { createDailySandpDto, DailySandpDto, DailySandpImageDto } from './daily-sandp.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Response } from 'express';
import { DailyHsiDwImageDto } from '../daily_hsi_dw/daily_hsi_dw.dto';

@Controller('daily-sp-500')
export class DailySandpController {
    constructor(private readonly DailySandpService: DailySandpService) {}

    @Get()
   async findAll(){
        return await this.DailySandpService.getTopPicks();
    }

    @Get('/:id')
    findById(@Param('id') id: number){
        return this.DailySandpService.getTopPicksById(id);
    }

    @Post('/update')
    async update(@Body() DailySandpDto: DailySandpDto){
        try{
        const affected = await this.DailySandpService.updateDailySP500(DailySandpDto);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insertDailySP500(@Body() createDailySandpDto: createDailySandpDto){
        try{
        const affected = await this.DailySandpService.insertDailySP500(createDailySandpDto);

        if(affected){
                return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number, @Res() res: Response, ){
        const buffer = await this.DailySandpService.getImage(id);
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
    async uploadFile(@Param('id') id: number, @Body() DailySandpImageDto: DailySandpImageDto) {
        const { image } = DailySandpImageDto;
        try{
            const uploded = await this.DailySandpService.updateImage({id, image});

            return { SUCCESS: true }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }
}
