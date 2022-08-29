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

 import { DailySingleStockService } from './dailySingleStock.service';
import { createDailySingleStockDto, DailySingleStockDto, DailySingleStockImageDto } from './dailySingleStock.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('daily-single-stock')
export class DailySingleStockController {
    constructor(private readonly DailySingleStockService: DailySingleStockService) {}

    @Get()
   async findAll(){
        return await this.DailySingleStockService.getTopPicks();
    }

    @Get('/:id')
    findById(@Param('id') id: number){
        return this.DailySingleStockService.getTopPicksById(id);
    }

    @Post('/update')
    async update(@Body() DailySingleStockDto: DailySingleStockDto){
        try{
        const affected = await this.DailySingleStockService.updateDailySP500(DailySingleStockDto);

        if(affected){
            return { SUCCESS: true }
        }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insertDailySP500(@Body() createDailySingleStockDto: createDailySingleStockDto){
        try{
        const affected = await this.DailySingleStockService.insertDailySP500(createDailySingleStockDto);

        if(affected){
                return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number, @Res() res: Response, ){
        const buffer = await this.DailySingleStockService.getImage(id);
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
    async uploadFile(@Param('id') id: number, @Body() DailySingleStockImageDto: DailySingleStockImageDto) {
        const { image } = DailySingleStockImageDto;
        try{
            const uploded = await this.DailySingleStockService.updateImage({id, image});

            return { SUCCESS: true }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }



    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.DailySingleStockService.deleteDailySP500(id)
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
