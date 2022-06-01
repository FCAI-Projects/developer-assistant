import { Test, TestingModule } from '@nestjs/testing';
import { ProjectListsResolver } from './project-lists.resolver';
import { ProjectListsService } from './project-lists.service';

describe('ProjectListsResolver', () => {
  let resolver: ProjectListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectListsResolver, ProjectListsService],
    }).compile();

    resolver = module.get<ProjectListsResolver>(ProjectListsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
