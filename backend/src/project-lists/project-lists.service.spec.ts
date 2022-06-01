import { Test, TestingModule } from '@nestjs/testing';
import { ProjectListsService } from './project-lists.service';

describe('ProjectListsService', () => {
  let service: ProjectListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectListsService],
    }).compile();

    service = module.get<ProjectListsService>(ProjectListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
