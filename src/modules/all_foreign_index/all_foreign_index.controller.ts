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

 import { AllForeignIndexService } from './all_foreign_index.service';
import { createAllForeignIndexDto, AllForeignIndexDto } from './all_foreign_index.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('AllForeignIndex')
export class AllForeignIndexController {
    constructor(private readonly AllForeignIndexService: AllForeignIndexService) {}

    @Get()
   async findAll(){
        return await this.AllForeignIndexService.getTopPicks();
    }
 
    @Get('/:id')
    findById(@Param('id') id: number){
        return this.AllForeignIndexService.AllForeignIndexById(id);
    }

    @Post('/update/:id')
    async update(@Param('id') id: number, @Body() AllForeignIndexDto: AllForeignIndexDto){
        try{
        const affected = await this.AllForeignIndexService.updateDailySP500(AllForeignIndexDto, id);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insert(@Body() createAllForeignIndexDto: createAllForeignIndexDto){
        try{
        const affected = await this.AllForeignIndexService.insert(createAllForeignIndexDto);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number ){
        return this.AllForeignIndexService.getImage(id);
    }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    async uploadFile(file, @Param('id') id: number) {
        const { buffer : image } = file;

        try{
            const uploded = await this.AllForeignIndexService.updateImage({image, id});

            return { status: "success", msg: "file uploaded" }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.AllForeignIndexService.deleteAllForeignIndex(id)
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
