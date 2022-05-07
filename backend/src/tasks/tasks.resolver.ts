import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskDocument> {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll(): Promise<TaskDocument[]> {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id') id: string): Promise<TaskDocument> {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskDocument> {
    return this.tasksService.update(id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id') id: string): Promise<TaskDocument> {
    return this.tasksService.remove(id);
  }
}
