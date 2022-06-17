import { Module } from '@nestjs/common';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';
import { GithubController } from './github.controller';

@Module({
  imports: [ProjectsModule, UsersModule],
  controllers: [GithubController],
})
export class GithubModule {}
