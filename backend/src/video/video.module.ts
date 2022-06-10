import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoGateway } from './video.gateway';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    GroupsModule
  ],
  providers: [VideoGateway, VideoService]
})
export class VideoModule {}
