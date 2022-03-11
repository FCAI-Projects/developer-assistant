import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// mongodb://localhost:27017/developer-assistant
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/developer-assistant'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
