import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { configDB, configGraphQL } from '../src/app.module';
import { UsersModule } from 'src/users/users.module';
import { usersStub } from 'src/users/stubs/users.stubs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

jest.mock('../src/users/users.service');

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, configDB, configGraphQL],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const ctx = GqlExecutionContext.create(context);
          ctx.getContext().req.user = { _id: '62a1ec12fe3c40e2b58a7259' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jest.clearAllMocks();
  });
  const gql = '/graphql';
  //   let tasks = {
  //     id: '62ab3cc271449c781378ee24' as unknown as ObjectId,
  //     name: 'Task 1',
  //     description: 'Task 1 description',

  //     attachments: [],
  //     status: 'todo',
  //     periority: 'medium',
  //     tags: [],
  //     startedAt: '2022-06-17T15:06:21.365Z',
  //     finishedAt: '2022-06-17T15:06:21.365Z',
  //     deadline: '2022-06-17T15:06:21.365Z',
  //     docs: '',
  //   }

  let users = usersStub();
  users.avatar = undefined;
  users.connectedWihGithub = undefined;
  users.connectedWihGoogle = undefined;

  test('/ get all users', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `query Users {
            users {
              id
              fname
              lname
              email
              password
              googleAppPassword
              githubToken
            }
          }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.users).toEqual([usersStub()]);
      });
  });

  test('/ create user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation CreateUser($createUserInput: CreateUserInput!) {
            createUser(createUserInput: $createUserInput) {
              userId
              token
            }
          }`,
        variables: {
          createUserInput: {
            fname: usersStub().fname,
            lname: usersStub().lname,
            email: usersStub().email,
            password: usersStub().password,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).not.toEqual(null);
      });
  });
});
