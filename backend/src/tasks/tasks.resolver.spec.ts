import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { configDB, configGraphQL } from 'src/app.module';
import { ProjectListsModule } from 'src/project-lists/project-lists.module';
import { Task, TaskSchema } from './entities/task.entity';
import { tasksStub } from './stubs/tasks.stub';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

jest.mock('./tasks.service');

describe('TasksResolver', () => {
  let resolver: TasksResolver;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        configDB,
        configGraphQL,
        MongooseModule.forFeature([
          {
            name: Task.name,
            schema: TaskSchema,
          },
        ]),
        ProjectListsModule,
      ],
      providers: [TasksResolver, TasksService],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
    service = module.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  const mockExecutionContext = createMock<ExecutionContext>();
  describe('getTask', () => {
    describe('when get tasts', () => {
      let tasks: Task[];

      beforeEach(async () => {
        tasks = await resolver.findAll('62ab3cc271449c781378ee24');
      });

      test('call tasts services', () => {
        expect(service.findAll).toHaveBeenCalled();
      });
      test('return tasts', () => {
        expect(tasks).toEqual([tasksStub()]);
      });
    });
  });

  describe('assgin member to task', () => {
    describe('when assgin member to tasts', () => {
      let tasks: Task;

      beforeEach(async () => {
        tasks = await resolver.assignMember('62ab3cc271449c781378ee24','62ab3cc271449c781378ee24');
      });

      test('call tasts services', () => {
        expect(service.updateModel).toHaveBeenCalled();
      });
      test('return tasts', () => {
        expect(tasks).toEqual(tasksStub());
      });
    });
  });
});

