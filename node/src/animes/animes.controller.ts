import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AnimesService } from './services/animes.service';

@Controller()
export class AnimesController {
  constructor(private readonly animesService: AnimesService) { }

  @Get('/title/:title')
  getAnimeByTitle(@Param('title') title: string) {
    return this.animesService.getAnimeByTitle(title);
  }

  @Get('/random')
  getRandomAnime() {
    return this.animesService.getRandomAnime();
  }

  @Get('sonic?')
  async getAnimeForSonic(@Query('param') reqParam: string) {
    console.log(reqParam);
    return await this.animesService.getAnimeForSonic(reqParam);
  }

  @Get('suggest?') 
  async getSuggestForSonic(@Query('param') reqParam: string) {
    return await this.animesService.getSuggestForSonic(reqParam);
  }
}
