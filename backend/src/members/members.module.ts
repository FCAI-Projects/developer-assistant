import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';

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
  ],
  providers: [MembersResolver, MembersService],
  exports: [MembersService],
})
export class MembersModule {}
