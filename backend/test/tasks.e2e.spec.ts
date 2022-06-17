import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { configDB, configGraphQL } from '../src/app.module';
import { projectStub } from 'src/projects/stubs/projects.stub';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TasksModule } from 'src/tasks/tasks.module';
import { tasksStub } from 'src/tasks/stubs/tasks.stub';
import { ObjectId } from 'mongoose';
import { TasksService } from 'src/tasks/tasks.service';

jest.mock('../src/tasks/tasks.service');

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let service: TasksService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule, configDB, configGraphQL],
     
    })
    // .overrideGuard(JwtAuthGuard)
    //   .useValue({
    //     canActivate: (context: ExecutionContext) => {
    //       const ctx = GqlExecutionContext.create(context);
    //       ctx.getContext().req.user = { _id: '62a1ec12fe3c40e2b58a7259' };
    //       return true;
    //     },
    //   })
      .compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<TasksService>(TasksService);
    await app.init();
    jest.clearAllMocks();
  });
  const gql = '/graphql';
  let tasks = {
    id: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    name: 'Task 1',
    description: 'Task 1 description',

    attachments: [],
    status: 'todo',
    periority: 'medium',
    tags: [],
    startedAt: '2022-06-17T15:06:21.365Z',
    finishedAt: '2022-06-17T15:06:21.365Z',
    deadline: '2022-06-17T15:06:21.365Z',
    docs: '',
  }



  test('/ get all tasks', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `query Tasks($project: String!) {
            tasks(project: $project) {
              id
              name
              description
              attachments
              status
              periority
              tags
              startedAt
              finishedAt
              deadline
              docs
            }
          }`,
        variables: {
            "project": projectStub().id
        }
        
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.tasks).toEqual([tasks]); 
      });
  });

  test('/ create tasks', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
        mutation Mutation($createTaskInput: CreateTaskInput!) {
          createTask(createTaskInput: $createTaskInput) {
            id
            name
            description
            attachments
            status
            periority
            tags
            startedAt
            finishedAt
            deadline
            docs
          }
        }`,
          variables: {
            "createTaskInput": {
              
              name: 'Task 1',
              description: 'Task 1 description',
              "project": projectStub().id,
          
              attachments: [],
              status: 'todo',
              periority: 'medium',
              tags: [],
              startedAt: '2022-06-17T15:06:21.365Z',
              finishedAt: '2022-06-17T15:06:21.365Z',
              deadline: '2022-06-17T15:06:21.365Z',
              docs: '',
              list: "62abdccd51e6f3d35456c740"
            }
            
          },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createTask).toEqual(tasks);
      });
  });

  test('/ find task by id', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `query Query($taskId: String!) {
          task(id: $taskId) {
            id
            name
            description
            status
            attachments
            periority
            tags
            startedAt
            finishedAt
            deadline
            docs
          }
        }`,
          variables: {
            "taskId": tasks.id
          },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.task).toEqual(tasks);
      });
  });

});
