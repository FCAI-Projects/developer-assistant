import { ApolloDriver } from '@nestjs/apollo';
import { ExecutionContext } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { configDB, configGraphQL } from 'src/app.module';
import { RolesModule } from 'src/roles/roles.module';
import { Project, ProjectSchema } from './entities/project.entity';

import { createMock } from '@golevelup/ts-jest';

import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { CreateProjectInput } from './dto/create-project.input';
import { projectStub } from './stubs/projects.stub';
import { UpdateProjectInput } from './dto/update-project.input';

jest.mock('./projects.service');
jest.mock('../roles/roles.service');

describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
      providers: [ProjectsResolver, ProjectsService],
    })
      // .overrideGuard(JwtAuthGuard)
      // .useValue({
      //   canActivate: (context: ExecutionContext) => {
      //     const ctx = GqlExecutionContext.create(context);
      //     ctx.getContext().req.user = { _id: '62a1ec12fe3c40e2b58a7259' }; // Your user object
      //     return true;
      //   },
      // })
      .compile();

    service = module.get<ProjectsService>(ProjectsService);
    resolver = module.get<ProjectsResolver>(ProjectsResolver);
    jest.clearAllMocks();
  });

  const mockExecutionContext = createMock<ExecutionContext>();
  describe('get owner projects', () => {
    describe('when get owner projects', () => {
      let project: Project[];

      beforeEach(async () => {
        project = await resolver.findAll(mockExecutionContext.switchToHttp());
      });

      test('call project services', () => {
        expect(service.findMyPorjects).toHaveBeenCalled();
      });
      test('return projects', () => {
        expect(project).toEqual([projectStub()]);
      });
    });
  });

  describe('createProject', () => {
    describe('when createProject is called', () => {
      let createProjectInput: CreateProjectInput;
      let project: Project;

      beforeEach(async () => {
        createProjectInput = {
          name: projectStub().name,
          budget: projectStub().budget,
          clientEmail: projectStub().clientEmail,
          description: projectStub().description,
        };
        project = await resolver.createProject(
          mockExecutionContext.switchToHttp(),
          createProjectInput,
        );
      });

      test('then it should call projectsService', () => {
        expect(service.create).toHaveBeenCalled();
      });

      test('then it should return a project', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });

  describe('updateProject', () => {
    describe('when updateProject is called', () => {
      let updateProjectInput: UpdateProjectInput;
      let project: Project;

      beforeEach(async () => {
        updateProjectInput = {
          name: projectStub().name,
          budget: projectStub().budget,
          clientEmail: projectStub().clientEmail,
          description: projectStub().description,
        };
        project = await resolver.updateProject(
          projectStub().id.toString(),
          updateProjectInput,
        );
      });

      test('then it should call projectsService', () => {
        expect(service.update).toHaveBeenCalled();
      });

      test('then it should return a project', () => {
        expect(project).toEqual(projectStub());
      });
    });
  });
});
