import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { MembersModule } from 'src/members/members.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { RolesModule } from 'src/roles/roles.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { TimeTrackingModule } from 'src/time-tracking/time-tracking.module';
import { UsersModule } from 'src/users/users.module';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [
    UsersModule,
    MembersModule,
    ProjectsModule,
    TasksModule,
    ExpensesModule,
    PaymentModule,
    RolesModule,
    TimeTrackingModule,
  ],
  controllers: [StatisticsController],
  providers: [JwtStrategy],
})
export class StatisticsModule {}
