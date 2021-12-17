import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnimesService } from './services/http.service';
import { AnimesController } from './animes.controller';
import { SonicModule } from 'src/sonic/sonic.module';

@Module({
  imports: [HttpModule, SonicModule],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimesModule {}
