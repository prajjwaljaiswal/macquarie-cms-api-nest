import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
  Response,
  Body,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HotListUpdateDTO } from './hotlist.dto';
import { HotlistService } from './hotlist.service';

@Controller('hotlist')
export class HotlistController {
  constructor(private hotlistService: HotlistService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchHotList() {
    return this.hotlistService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:ric')
  async updateHotList(
    @Param('ric') ric: string,
    @Body() hotListUpdateDTO: HotListUpdateDTO,
    @Response() res,
  ) {
    return this.hotlistService
      .updateHotlist(ric, hotListUpdateDTO)
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: 'Successfully update the record' }),
      )
      .catch((err) => {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: 'Failed to update the record' });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async deleteHostList(
    @Body() hotListUpdateDTO: HotListUpdateDTO,
    @Response() res,
  ) {
    const result = (await this.hotlistService.deleteHotListItem(
      hotListUpdateDTO.category,
      hotListUpdateDTO.id,
    )) as any;

    if (result?.affected) {
      return res
        .status(200)
        .json({ success: true, message: 'Successfully deleted the record' });
    }

    return res
      .status(400)
      .json({ success: false, message: 'Failed to delete the record' });
  }
}
