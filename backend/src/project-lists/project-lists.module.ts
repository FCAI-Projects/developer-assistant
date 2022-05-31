import { Module } from '@nestjs/common';
import { ProjectListsService } from './project-lists.service';
import { ProjectListsResolver } from './project-lists.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectLists,
  ProjectListsSchema,
} from './entities/project-lists.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectLists.name, schema: ProjectListsSchema },
    ]),
  ],
  providers: [ProjectListsResolver, ProjectListsService],
  exports: [ProjectListsService],
})
export class ProjectListsModule {}
