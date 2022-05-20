import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule {}
