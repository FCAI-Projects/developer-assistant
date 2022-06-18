import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtRestAuthGuard } from 'src/auth/jwt.rest.guard';
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

  @Get('projects')
  @UseGuards(JwtRestAuthGuard)
  async getMyProjects(@Req() req: any) {
    const projects = await this.projectsService.findMyPorjects(req.user._id);
    const membersIn = await this.membersService.getUserProjects(req.user._id);

    membersIn.forEach((member) => {
      projects.push(member.project);
    });

    return projects;
  }

  @Get('numbers')
  @UseGuards(JwtRestAuthGuard)
  async getNumbers(@Req() req: any) {
    const tasks = await this.tasksService.filter({ assign: req.user._id });
    const done = tasks.filter((task) => task.status === 'done');
    const projects = await this.projectsService.findMyPorjects(req.user._id);
    const members = await this.membersService.getUserProjects(req.user._id);

    return {
      projects: projects.length,
      tasks: tasks.length,
      done: done.length,
      members: members.length,
    };
  }

  @Get('tasks')
  @UseGuards(JwtRestAuthGuard)
  async tasksStatistics(@Query('id') id: string, @Req() req: any) {
    const filter = id
      ? { project: id, user: req.user._id }
      : { user: req.user._id };
    const tasks = await this.tasksService.filter(filter);

    let todo = 0;
    let doing = 0;
    let done = 0;

    for (const task of tasks) {
      if (task.status === 'todo') {
        todo++;
      }
      if (task.status === 'doing') {
        doing++;
      }
      if (task.status === 'done') {
        done++;
      }
    }

    return {
      done: done,
      undone: todo + doing,
    };
  }

  @Get('tasks/late/:id')
  async tasksLate(@Param('id') id: string) {
    const tasks = await this.tasksService.filter({ project: id });
    let late = 0;
    let early = 0;
    for (const task of tasks) {
      if (task.status === 'done' && task.deadline < task.finishedAt) {
        late++;
      } else if (task.status === 'done' && task.deadline > task.finishedAt) {
        early++;
      }
    }
    return {
      late,
      early,
    };
  }

  @Get('expenses/:id')
  async expensesFromBudget(@Param('id') id: string) {
    const expenses = await this.expensesService.findAll(id);
    const project = await this.projectsService.findOne(id);
    const payments = await this.paymentService.findAll(id);

    let expensesTotal = 0;
    let paymentsTotal = 0;
    for (const expense of expenses) {
      expensesTotal += expense.amount;
    }
    for (const payment of payments) {
      paymentsTotal += payment.amount;
    }
    return {
      expensesTotal,
      paymentsTotal,
      budget: project.budget,
    };
  }

  @Get('payments/:id')
  async payments(@Param('id') id: string) {
    const payments = await this.paymentService.findAll(id);

    return payments;
  }

  @Get('timeTracking')
  @UseGuards(JwtRestAuthGuard)
  async timeTracking(@Req() req: any) {
    const timeTracking = await this.timeTrackingService.filter({
      user: req.user._id,
    });
    const projects = await this.projectsService.findMyPorjects(req.user._id);
    const memberIn = await this.membersService.getUserProjects(req.user._id);

    let result = {};
    for (const record of timeTracking) {
      if (!record.task) continue;
      const project = projects.find(
        (project) => project._id.toString() === record.task?.project.toString(),
      );
      const member = memberIn.find(
        (member) =>
          member.project._id.toString() === record.task?.project.toString(),
      );
      let name = '';
      if (project) {
        name = project.name;
      }
      if (member) {
        name = member.project.name;
      }

      if (result[name]) {
        result[name] += record.duration;
      } else {
        result[name] = record.duration;
      }
    }
    return result;
  }
}
