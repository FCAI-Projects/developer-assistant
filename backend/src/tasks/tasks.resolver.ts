import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { ProjectListsService } from 'src/project-lists/project-lists.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectListsService: ProjectListsService,
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
    return await this.tasksService.update(id, updateTaskInput);
  }

  // @Mutation(() => Boolean)
  // async uploadAttachments(
  //   @Args('id') id: string,
  //   @Args({ name: 'attachment', type: () => GraphQLUpload })
  //   { createReadStream, filename }: FileUpload,
  // ): Promise<boolean> {
  //   return new Promise(async (resolve, reject) =>
  //     createReadStream()
  //       .pipe(createWriteStream(`./uploads/${filename}`))
  //       .on('finish', async () => {
  //         await this.tasksService.updateModel(id, {
  //           $push: { attachments: filename },
  //         });
  //         resolve(true);
  //       })
  //       .on('error', () => reject(false)),
  //   );
  // }

  @Mutation(() => Task)
  async assignMember(
    @Args('id') id: string,
    @Args('member') member: string,
  ): Promise<TaskDocument> {
    return await this.tasksService.updateModel(id, {
      $push: { assign: member },
    });
  }

  @Mutation(() => Task)
  async RemoveAssignMember(
    @Args('id') id: string,
    @Args('member') member: string,
  ): Promise<TaskDocument> {
    return await this.tasksService.RemoveAssignMember(id, {
      $pull: { assign: member },
    });
  }

  @Mutation(() => Task)
  async removeTask(@Args('id') id: string): Promise<TaskDocument> {
    return await this.tasksService.remove(id);
  }
}
