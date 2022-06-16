import { ApolloDriver } from '@nestjs/apollo';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { configDB, configGraphQL } from 'src/app.module';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesModule } from 'src/roles/roles.module';
import { CreateProjectInput } from './dto/create-project.input';
import { Project, ProjectSchema } from './entities/project.entity';

import { createMock } from '@golevelup/ts-jest';
import { projectStub } from './stubs/user.stub';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

jest.mock('./projects.service');

describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;
  let service: ProjectsService;

  let app;
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
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const ctx = GqlExecutionContext.create(context);
          ctx.getContext().req.user = { _id: '62a1ec12fe3c40e2b58a7259' }; // Your user object
          return true;
        },
      })
      .compile();
    app = module.createNestApplication();
    await app.init();
    service = module.get(ProjectsService);
    resolver = module.get(ProjectsResolver);
    jest.clearAllMocks();
  });

  // it('should be defined', () => {
  //   expect(resolver).toBeDefined();
  // });
  const mockExecutionContext = createMock<ExecutionContext>();
  describe('get owner projects', () => {
    describe('when get owner projects', () => {
      let project: Project[];

      beforeEach(async () => {
        project = await resolver.findAll(mockExecutionContext.switchToHttp());
      });

      test('call project services', () => {
        expect(service.findMyPorjects).toBeCalledWith(projectStub().owner);
      });
      // test('return projects', () => {
      //   expect(project).toEqual([projectStub()]);
      // });
    });
  });
});
