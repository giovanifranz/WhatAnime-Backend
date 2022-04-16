import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AnimesModule } from './http/http.module';

@Module({
  imports: [DatabaseModule, AnimesModule],
})
export class AppModule {}
