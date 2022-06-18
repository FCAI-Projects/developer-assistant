import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { configDB, configGraphQL } from '../src/app.module';
import { ProjectsModule } from 'src/projects/projects.module';

import { RolesModule } from 'src/roles/roles.module';
import { projectStub } from 'src/projects/stubs/projects.stub';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { GqlExecutionContext } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from 'src/auth/jwt.strategy';

jest.mock('../src/projects/projects.service');
jest.mock('../src/roles/roles.service');

describe('ProjectsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectsModule, configDB, configGraphQL],
     
    }).overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const ctx = GqlExecutionContext.create(context);
          ctx.getContext().req.user = { _id: '62a1ec12fe3c40e2b58a7259' }; // Your user object
          return true;
        },
      }).compile();

    app = moduleFixture.createNestApplication();
   
    await app.init();
    jest.clearAllMocks();
  });
  const gql = '/graphql';
  let projects = projectStub();
  projects.owner = undefined;
  test('/ get all projects', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `query Query {
            projects {
                name
                id
                budget
                describtion
                clientEmail,
               
            }
          }`,
        
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.projects).toEqual([projects]);
      });
  });

  test('/ create projects', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation Mutation($createProjectInput: CreateProjectInput!) {
            createProject(createProjectInput: $createProjectInput) {
              budget
              describtion
              clientEmail
              name
              id
            }
          }`,
          variables: {
            "createProjectInput": {
                "name": projects.name,
                "clientEmail": projects.clientEmail,
                "describtion": projects.describtion,
                "budget": projects.budget
              }
          },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createProject).toEqual(projects);
      });
  });
 
  test('/ find projects by id', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `query Project($projectId: String!) {
            project(id: $projectId) {
              id
              name
              clientEmail
              describtion
              budget
            }
          }`,
          variables: {
            "projectId": projects.id
          },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.project).toEqual(projects);
      });
  });

  test('/ updateProject', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation Mutation($updateProjectId: String!, $updateProjectInput: UpdateProjectInput!) {
            updateProject(id: $updateProjectId, updateProjectInput: $updateProjectInput) {
              id
              name
              clientEmail
              describtion
              budget
            }
          }`,
          variables: {
            "updateProjectId": projects.id,
            "updateProjectInput": {
                "name": projects.name,
                "clientEmail": projects.clientEmail,
                "describtion": projects.describtion,
                "budget": projects.budget
            }
          },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateProject).toEqual(projects);
      });
  });
});
