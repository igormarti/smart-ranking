import { Module } from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import { ConfigModule,ConfigService } from 'nestjs-dotenv';

import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';


const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${configService.get('MONGO_USER')}:${configService.get('MONGO_PWD')}@cluster0.u1o9n.mongodb.net/${configService.get('MONGO_DB')}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false
    }),
    PlayersModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
