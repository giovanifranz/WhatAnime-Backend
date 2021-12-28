import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnimesService, ExternalApiService } from './services';
import { SonicService } from 'src/sonic';

@Controller()
export class AnimesController {
  constructor(
    private readonly animesService: AnimesService,
    private readonly sonicService: SonicService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  @Get('/title/:title')
  async getAnimeByTitle(@Param('title') title: string) {
    return await this.animesService.getAnimeByTitle(title);
  }

  @Get('/random')
  async getRandomAnime() {
    return await this.animesService.getRandomAnime();
  }

  @Get('/sonic?')
  async getAnimeForSonic(@Query('param') reqParam: string) {
    return await this.sonicService.getAnimeForSonic(reqParam);
  }

  @Get('/suggest?') 
  async getSuggestForSonic(@Query('param') reqParam: string) {
    return await this.sonicService.getSuggestForSonic(reqParam);
  }

  @Get('/airing')
  async getTopAiring() {
    return await this.externalApiService.getTopAiring();
  }

  @Get('/popular')
  async getTopPopular() {
    return await this.externalApiService.getTopPopular();
  }
}
