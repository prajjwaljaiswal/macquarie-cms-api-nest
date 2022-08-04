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

 import { DailySandpService } from './daily_hsi_dw.service';
import { createDailyHsiDwDto, DailyHsiDwDto } from './daily_hsi_dw.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('daily-hsi-dw')
export class DailySandpController {
    constructor(private readonly DailySandpService: DailySandpService) {}

    @Get()
   async findAll(){
        return await this.DailySandpService.getTopPicks();
    }

    @Post('/update')
    async update(@Body() DailyHsiDwDto: DailyHsiDwDto){
        try{
        const affected = await this.DailySandpService.updateDailySP500(DailyHsiDwDto);

        if(affected){
            return {
                status: "success",
                msg: "Update Sucessfully"
            }
        }

        }catch(err){
            return {
                status: "failed", msg: err.message
            }
        }
        
    }



    @Post()
    async insert(@Body() createDailyHsiDwDto: createDailyHsiDwDto){
        try{
        const affected = await this.DailySandpService.insert(createDailyHsiDwDto);

        if(affected){
            return {
                status: "success",
                msg: "Insert Sucessfully"
            }
        }

        }catch(err){
            return {
                status: "failed", msg: err.message
            }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number ){
        return this.DailySandpService.getImage(id);
    }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    async uploadFile(file, @Param('id') id: number) {
        const { buffer : image } = file;

        try{
            const uploded = await this.DailySandpService.updateImage({image, id});

            return { status: "success", msg: "file uploaded" }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }
}
