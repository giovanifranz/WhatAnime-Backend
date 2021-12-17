import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimesService } from './services/http.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller()
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get('/id/:id')
  async findById(@Param('id') id: number) {
    return this.animesService.findById(id);
  }

  @Get('/title/:title')
  async findByTitle(@Param('title') title: string) {
    return await this.animesService.findByTitle(title);
  }

  @Get('/quote')
  async findQuote() {
    return await this.animesService.findQuote();
  }
}
