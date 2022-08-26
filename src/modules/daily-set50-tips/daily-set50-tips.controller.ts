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
    UploadedFile,
    UseGuards,
    UseInterceptors
 } from '@nestjs/common';

 import { DailySet50TipsService } from './daily-set50-tips.service';
import { createDailySet50TipsDto, DailySet50TipsDto } from './daily-set50-tips.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('DwSet50Tips')
export class DailySet50TipsController {
    constructor(private readonly DailySet50TipsService: DailySet50TipsService) {}

    @Get()
   async findAll(){
        return await this.DailySet50TipsService.getTopPicks();
    }
 
    @Get('/:id')
    findById(@Param('id') id: number){
        return this.DailySet50TipsService.DailySet50TipsById(id);
    }

    @Post('/update/:id')
    async update(@Param('id') id: number, @Body() DailySet50TipsDto: DailySet50TipsDto){
        try{
        const affected = await this.DailySet50TipsService.updateDailySP500(DailySet50TipsDto, id);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insert(@Body() createDailySet50TipsDto: createDailySet50TipsDto){
        try{
        const affected = await this.DailySet50TipsService.insert(createDailySet50TipsDto);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number ){
        return this.DailySet50TipsService.getImage(id);
    }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    async uploadFile(file, @Param('id') id: number) {
        const { buffer : image } = file;

        try{
            const uploded = await this.DailySet50TipsService.updateImage({image, id});

            return { status: "success", msg: "file uploaded" }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.DailySet50TipsService.deleteDailySet50Tips(id)
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
