import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// mongodb://localhost:27017/developer-assistant
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/developer-assistant'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
