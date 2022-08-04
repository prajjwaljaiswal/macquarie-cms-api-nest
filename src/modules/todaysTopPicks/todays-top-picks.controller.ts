import { 
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseGuards
 } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

 import { TodaysTopPicksService } from './todays-top-picks.service';
import { TodayTopPicksDto, CreateTopPicksDto } from './top-picks.dto';

@Controller('todays-top-picks')
export class TodaysTopPicksController {
    constructor(private readonly TodaysTopPicksService: TodaysTopPicksService) {}

    @Get()
    findAll(){
        return this.TodaysTopPicksService.getTopPicks();
    }

    @Get('/:id')
    findById(@Param('id') id: number){
        return this.TodaysTopPicksService.getTopPicksById(id);
    }


    @Post()
    async createTopPicks(@Body() CreateTopPicks: CreateTopPicksDto){
         try{
            await this.TodaysTopPicksService.createTopPicks(CreateTopPicks); 
            return { SUCCESS: true }
        }catch(err){
            return { status: "failed", msg: err.message }
        }
    }

    @Post('/update')
    async update(@Body() TodayTopPicksDto: TodayTopPicksDto){
        try{
        const affected = await this.TodaysTopPicksService.updateTopPicks(TodayTopPicksDto);

        if(affected){
            return {
                SUCCESS: true
            }
        }

        }catch(err){
            return {
                status: "failed", msg: err.message
            }
        }
        
    }


    @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  deleteTopPicks(@Param('id', new ParseIntPipe()) id: number) {
    return this.TodaysTopPicksService.deleteTopPicks(id)
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
