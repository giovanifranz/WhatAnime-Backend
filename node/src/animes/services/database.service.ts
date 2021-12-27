import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Anime,  } from '../entities/anime.entity';
import { sonicChannelIngest } from 'src/sonic/sonic';
import { CreateAnimeDto } from '../dto/create-anime.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('Anime') private readonly animeModel: Model<Anime>,
  ) { }

  async createInDatabases(anime: CreateAnimeDto): Promise<Anime> {
    const createdAnime = new this.animeModel(anime);
    const animeSaved = await createdAnime.save();

    if (!animeSaved) {
      throw new InternalServerErrorException('Problema para salvar anime');
    }

    await sonicChannelIngest.push(
      'anime-database',
      'animes',
      `${createdAnime._id}`,
      `${createdAnime.title} ${createdAnime.synopsis}`,
      {
        lang: 'eng',
      },
    );
    return animeSaved;
  }
}
