import { Module } from '@nestjs/common';
import { ProjectStatusService } from './project-status.service';
import { ProjectStatusResolver } from './project-status.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectStatus,
  ProjectStatusSchema,
} from './entities/project-status.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectStatus.name, schema: ProjectStatusSchema },
    ]),
  ],
  providers: [ProjectStatusResolver, ProjectStatusService],
})
export class ProjectStatusModule {}
