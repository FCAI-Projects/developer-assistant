import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { TasksModule } from './tasks/tasks.module';
import { RolesModule } from './roles/roles.module';
import { NotesModule } from './notes/notes.module';
import { CommentsModule } from './comments/comments.module';
import { GroupsModule } from './groups/groups.module';
import { MessagesModule } from './messages/messages.module';
import { ProjectListsModule } from './project-lists/project-lists.module';
import { ExpensesModule } from './expenses/expenses.module';
import { TimeTrackingModule } from './time-tracking/time-tracking.module';
import { VideoModule } from './video/video.module';
import { UploadsModule } from './uploads/uploads.module';
import { PaymentcallbackModule } from './paymentcallback/paymentcallback.module';
import { PaymentModule } from './payment/payment.module';
import { GithubModule } from './github/github.module';
import { StatisticsModule } from './statistics/statistics.module';

export const configDB = MongooseModule.forRoot(
  'mongodb+srv://gp:gp123456@cluster0.fyzf3.mongodb.net/developer-assistant?retryWrites=true&w=majority',
); 

export const configGraphQL =  GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
});



@Module({
  imports: [
    configDB,
    configGraphQL,
    UsersModule,
    ProjectsModule,
    MembersModule,
    TasksModule,
    RolesModule,
    NotesModule,
    CommentsModule,
    GroupsModule,
    MessagesModule,
    ProjectListsModule,
    ExpensesModule,
    TimeTrackingModule,
    VideoModule,
    GroupsModule,

    UploadsModule,

    PaymentcallbackModule,
    PaymentModule,
    GithubModule,
    StatisticsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

