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

 import { HotTopicReviewService } from './hot-topic-review.service';
import { createHotTopicReviewDto, HotTopicReviewDto } from './hot-topic-review.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('HotTopicReview')
export class HotTopicReviewController {
    constructor(private readonly HotTopicReviewService: HotTopicReviewService) {}

    @Get()
   async findAll(){
        return await this.HotTopicReviewService.getTopPicks();
    }
 
    @Get('/:id')
    findById(@Param('id') id: number){
        return this.HotTopicReviewService.HotTopicReviewById(id);
    }

    @Post('/update/:id')
    async update(@Param('id') id: number, @Body() HotTopicReviewDto: HotTopicReviewDto){
        try{
        const affected = await this.HotTopicReviewService.updateDailySP500(HotTopicReviewDto, id);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }



    @Post()
    async insert(@Body() createHotTopicReviewDto: createHotTopicReviewDto){
        try{
        const affected = await this.HotTopicReviewService.insert(createHotTopicReviewDto);

        if(affected){
            return { SUCCESS: true }
        }

        }catch(err){
            return { status: "failed", msg: err.message }
        }
        
    }


    @Get('/Image/:id')
    async getImage(@Param('id') id: number ){
        return this.HotTopicReviewService.getImage(id);
    }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    async uploadFile(file, @Param('id') id: number) {
        const { buffer : image } = file;

        try{
            const uploded = await this.HotTopicReviewService.updateImage({image, id});

            return { status: "success", msg: "file uploaded" }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/delete/:id')
    deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
      return this.HotTopicReviewService.deleteHotTopicReview(id)
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
