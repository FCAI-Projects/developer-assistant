import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule, configDB, configGraphQL } from './../src/app.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/projects/entities/project.entity';
import { RolesModule } from 'src/roles/roles.module';
import { projectStub } from 'src/projects/stubs/projects.stub';

jest.mock('./projects.service');
jest.mock('../roles/roles.service');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectsModule,
        configDB,
        configGraphQL,
        RolesModule,
        MongooseModule.forFeature([
          {
            name: Project.name,
            schema: ProjectSchema,
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
     jest.clearAllMocks();
  });
  const gql = "/graphql";

  test('/ get all projects', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: ``
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.projects).toEqual(projectStub());
      });
  });
});
