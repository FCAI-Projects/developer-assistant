import { Controller } from '@nestjs/common';
import { ExpensesService } from 'src/expenses/expenses.service';
import { MembersService } from 'src/members/members.service';
import { PaymentService } from 'src/payment/payment.service';
import { ProjectsService } from 'src/projects/projects.service';
import { RolesService } from 'src/roles/roles.service';
import { TasksService } from 'src/tasks/tasks.service';
import { TimeTrackingService } from 'src/time-tracking/time-tracking.service';
import { UsersService } from 'src/users/users.service';

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly membersService: MembersService,
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
    private readonly expensesService: ExpensesService,
    private readonly paymentService: PaymentService,
    private readonly rolesService: RolesService,
    private readonly timeTrackingService: TimeTrackingService,
  ) {}
}
