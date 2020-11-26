import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './interface/category.schema';
import { SubscribeController } from './controllers/subscribe/subscribe.controller';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports:
  [
    MongooseModule.forFeature([{name:'Category',schema:CategorySchema}]),
    PlayersModule
  ],
  controllers: [CategoriesController, SubscribeController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
