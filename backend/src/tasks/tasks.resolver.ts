import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { ProjectListsService } from 'src/project-lists/project-lists.service';
import * as async from 'async';

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

  @Query(() => [Task], { name: 'unlistedTasks' })
  async findTaskNotListed(
    @Args('project') project: string,
  ): Promise<TaskDocument[]> {
    const tasks = await this.tasksService.findAll(project);
    const result: TaskDocument[] = [];

    await async.each(tasks, async (task: TaskDocument) => {
      const projectLists = await this.projectListsService.filter({
        project,
        tasks: task.id,
      });

      console.log(projectLists, task);

      if (projectLists.length === 0) {
        result.push(task);
      }
    });

    return result;
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

  @Mutation(() => Task)
  async removeTask(@Args('id') id: string): Promise<TaskDocument> {
    return await this.tasksService.remove(id);
  }
}
