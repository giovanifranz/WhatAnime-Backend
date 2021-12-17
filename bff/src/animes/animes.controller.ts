import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller()
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get('/id/:id')
  findById(@Param('id') id: number) {
    return this.animesService.findById(id);
  }

  @Get('/title/:title')
  findByTitle(@Param('title') title: string) {
    return this.animesService.findByTitle(title);
  }

  @Get('/quote')
  findQuote() {
    return this.animesService.findQuote();
  }

  @Get('/random')
  findRandomId() {
    return this.animesService.findRandomId();
  }

  @Post()
  async create(
    @Body() createAnimeDto: CreateAnimeDto,
  ): Promise<CreateAnimeDto> {
    return this.animesService.create(createAnimeDto);
  }
}
