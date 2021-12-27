import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnimesService } from './services/animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller()
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get('/title/:title')
  getAnimeByTitle(@Param('title') title: string) {
    return this.animesService.getAnimeByTitle(title);
  }
}
