import { Test, TestingModule } from '@nestjs/testing';
import { ProjectStatusResolver } from './project-status.resolver';
import { ProjectStatusService } from './project-status.service';

describe('ProjectStatusResolver', () => {
  let resolver: ProjectStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectStatusResolver, ProjectStatusService],
    }).compile();

    resolver = module.get<ProjectStatusResolver>(ProjectStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
