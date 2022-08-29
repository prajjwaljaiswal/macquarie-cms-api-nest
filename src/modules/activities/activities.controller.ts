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

 import { ActivitiesService } from './activities.service';
import { createActivitiesDto, ActivitiesDto } from './activities.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly ActivitiesService: ActivitiesService) {}

    @Get()
   async findAll(){
        return await this.ActivitiesService.getTopPicks();
    }
 
    @Get('/:id')
    findById(@Param('id') id: number){
        return this.ActivitiesService.ActivitiesById(id);
    }

    @Post('/update/:id')
    async update(@Param('id') id: number, @Body() ActivitiesDto: ActivitiesDto){
        try{
        const affected = await this.ActivitiesService.updateDailySP500(ActivitiesDto, id);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insert(@Body() createActivitiesDto: createActivitiesDto){
        try{
        const affected = await this.ActivitiesService.insert(createActivitiesDto);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number ){
        return this.ActivitiesService.getImage(id);
    }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    async uploadFile(file, @Param('id') id: number) {
        const { buffer : image } = file;

        try{
            const uploded = await this.ActivitiesService.updateImage({image, id});

            return { status: "success", msg: "file uploaded" }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.ActivitiesService.deleteActivities(id)
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
