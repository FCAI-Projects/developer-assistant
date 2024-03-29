import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { ProjectListsService } from 'src/project-lists/project-lists.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream, mkdirSync } from 'fs';
import mongoose from 'mongoose';
import { HttpException, Logger } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ProjectsService } from 'src/projects/projects.service';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectListsService: ProjectListsService,
    private readonly projectsService: ProjectsService,
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskDocument> {
    const listId = createTaskInput.list;
    delete createTaskInput.list;
    const task = await this.tasksService.create(createTaskInput);
    await this.projectListsService.pushNewTask(listId, task._id);
    return task;
  }

  @Query(() => [Task], { name: 'tasks' })
  async findAll(@Args('project') project: string): Promise<TaskDocument[]> {
    return await this.tasksService.findAll(project);
  }

  @Query(() => [Task], { name: 'tasksByUserId' })
  async findByUser(@Args('userId') userId: string): Promise<TaskDocument[]> {
    return await this.tasksService.findByUser(userId);
  }

  @Query(() => Task, { name: 'task' })
  async findOne(@Args('id') id: string): Promise<TaskDocument> {
    return await this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskDocument> {
    const task = await this.tasksService.findOne(id);
    if (updateTaskInput.startedAt) {
      this.deadlineNotifications(
        `${task.name} Task`,
        `${task.name} has been started`,
        id,
      );
    }
    if (updateTaskInput.deadline) {
      this.createCronJob(id, updateTaskInput.deadline);
    }
    if (updateTaskInput.status === 'done')
      updateTaskInput.finishedAt = new Date();
    return await this.tasksService.update(id, updateTaskInput);
  }

  @Mutation(() => Boolean)
  async uploadAttachments(
    @Args('id') id: string,
    @Args({ name: 'attachment', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    mkdirSync(`./uploads/attachments`, { recursive: true });
    const newFileName = `${id}-${new Date().getTime()}-${filename.replace(
      /\s/g,
      '-',
    )}`;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/attachments/${newFileName}`))
        .on('finish', async () => {
          await this.tasksService.updateModel(id, {
            $push: { attachments: newFileName },
          });
          resolve(true);
        })
        .on('error', (error) => {
          console.log('error', error);
          reject(false);
        }),
    );
  }

  @Mutation(() => Task)
  async assignMember(
    @Args('id') id: string,
    @Args('member') member: string,
  ): Promise<TaskDocument> {
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(member)) {
      throw new HttpException('Invalid ID', 400);
    }
    // assgin member to task
    const res = await this.tasksService.updateModel(id, {
      $push: { assign: member },
    });

    // get user info
    const user = await this.usersService.findOne(member);

    // send notification to user
    const notificationFirebase = {
      notification: {
        title: 'Assgin new Task',
        body: 'Assgin to ' + res.name,
      },
      data: {
        title: 'Assgin new Task',
        body: 'Assgin to ' + res.name,
      },
    };

    this.firebaseService.sendNotification(
      user.firebaseToken,
      notificationFirebase,
    );

    return res;
  }

  @Mutation(() => Task)
  async RemoveAssignMember(
    @Args('id') id: string,
    @Args('member') member: string,
  ): Promise<TaskDocument> {
    const res = await this.tasksService.RemoveAssignMember(id, {
      $pull: { assign: member },
    });
    // get user info
    const user = await this.usersService.findOne(member);

    // send notification to user
    const notificationFirebase = {
      notification: {
        title: 'Removed from Assigned Task',
        body: 'Removed from ' + res.name + ' Task',
      },
      data: {
        // title: 'Assgin new Task',
        // body: 'Assgin to ' + res.name,
      },
    };

    this.firebaseService.sendNotification(
      user.firebaseToken,
      notificationFirebase,
    );
    return res;
  }

  @Mutation(() => Task)
  async removeTask(@Args('id') id: string): Promise<TaskDocument> {
    return await this.tasksService.remove(id);
  }

  //2022-06-19T04:40:00.000+00:00
  private async createCronJob(id: string, date: Date): Promise<CronJob> {
    const task = await this.tasksService.findOne(id);

    // handle if hours between deadline and current time less then 6 hours send notification now
    const ms = new Date(date).getTime() - new Date().getTime();
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    if (days === 0 && hours <= 6) {
      this.deadlineNotifications(
        `Deadline ${task.name}`,
        `Deadline ${task.name} Task after ${hours} hours`,
        id,
      );
      return;
    }

    // if greater then 6 hours create cron job
    date.setHours(date.getHours() - 6);
    try {
      if (this.schedulerRegistry.doesExist('cron', id))
        this.schedulerRegistry.deleteCronJob(id);
    } catch (error) {
      console.log(error);
    }

    try {
      const job = new CronJob(
        `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} * *`,
        async () => {
          this.deadlineNotifications(
            `Deadline ${task.name}`,
            `Deadline ${task.name} Task after 6 hours`,
            id,
          );
          this.schedulerRegistry.deleteCronJob(id);
        },
      );

      this.schedulerRegistry.addCronJob(id, job);
      job.start();
      return job;
    } catch (e) {
      console.log(e);
    }
  }

  // send notification to assgined users and project owner
  private async deadlineNotifications(title: string, body: string, id: string) {
    const task = await this.tasksService.findOne(id);
    const project = task.project as unknown as Project;
    const user = await this.usersService.findOne(project.owner.toString());

    // send notification to project owner
    const notificationFirebase = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        title: title,
        body: body,
      },
    };

    this.firebaseService.sendNotification(
      user.firebaseToken,
      notificationFirebase,
    );

    // send notification to project members
    task.assign.forEach(async (member) => {
      const user = member as unknown as User;
      this.firebaseService.sendNotification(
        user.firebaseToken,
        notificationFirebase,
      );
    });
  }
}
