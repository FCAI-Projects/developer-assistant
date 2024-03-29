import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { GroupsModule } from 'src/groups/groups.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
    ]),
    UsersModule,
    forwardRef(() => ProjectsModule),
    GroupsModule,
    TasksModule,
  ],
  providers: [MembersResolver, MembersService],
  exports: [MembersService],
})
export class MembersModule {}
