import { Controller, Get, Param, Query } from '@nestjs/common'
import { SonicService } from 'src/sonic'
import { AnimesService } from './animes.service'

@Controller()
export class AnimesController {
  constructor(
    private sonicService: SonicService,
    private animesService: AnimesService
  ) {}

  @Get('/title/:title')
  async getAnimeByTitle(@Param('title') title: string) {
    return await this.animesService.getAnimeByTitle(title)
  }

  @Get('/random')
  async getRandomAnime() {
    return await this.animesService.getAnimeRandom()
  }

  @Get('/sonic')
  async getAnimeForSonic(@Query('param') reqParam: string) {
    return await this.sonicService.getAnimeForSonic(reqParam)
  }

  @Get('/suggest')
  async getSuggestForSonic(@Query('param') reqParam: string) {
    return await this.sonicService.getSuggestForSonic(reqParam)
  }

  @Get('/airing')
  async getTopAiring() {
    return await this.animesService.getTopAiring()
  }

  @Get('/popular')
  async getTopPopular() {
    return await this.animesService.getTopPopular()
  }

  @Get('/quote')
  async getQuote() {
    return await this.animesService.getQuote()
  }
}
