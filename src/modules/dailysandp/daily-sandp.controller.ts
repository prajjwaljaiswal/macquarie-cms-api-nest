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

 import { DailySandpService } from './daily-sandp.service';
import { createDailySandpDto, DailySandpDto } from './daily-sandp.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('daily-sp-500')
export class DailySandpController {
    constructor(private readonly DailySandpService: DailySandpService) {}

    @Get()
   async findAll(){
        return await this.DailySandpService.getTopPicks();
    }

    @Post('/update')
    async update(@Body() DailySandpDto: DailySandpDto){
        try{
        const affected = await this.DailySandpService.updateDailySP500(DailySandpDto);

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
    async insertDailySP500(@Body() createDailySandpDto: createDailySandpDto){
        try{
        const affected = await this.DailySandpService.insertDailySP500(createDailySandpDto);

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
