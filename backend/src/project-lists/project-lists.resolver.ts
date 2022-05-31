import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectListsService } from './project-lists.service';
import { ProjectLists } from './entities/project-lists.entity';
import { CreateProjectListsInput } from './dto/create-project-lists.input';
import { UpdateProjectListsInput } from './dto/update-project-lists.input';

@Resolver(() => ProjectLists)
export class ProjectListsResolver {
  constructor(private readonly projectListsService: ProjectListsService) {}

  @Mutation(() => ProjectLists)
  createProjectLists(
    @Args('createProjectListsInput')
    createProjectListsInput: CreateProjectListsInput,
  ) {
    return this.projectListsService.create(createProjectListsInput);
  }

  @Query(() => [ProjectLists], { name: 'projectLists' })
  findAll(@Args('project', { type: () => String }) project: string) {
    return this.projectListsService.findAll(project);
  }

  @Query(() => ProjectLists, { name: 'projectListsById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.projectListsService.findOne(id);
  }

  @Mutation(() => ProjectLists)
  updateProjectLists(
    @Args('updateProjectListsInput')
    updateProjectListsInput: UpdateProjectListsInput,
  ) {
    return this.projectListsService.update(
      updateProjectListsInput.id,
      updateProjectListsInput,
    );
  }

  @Mutation(() => ProjectLists)
  removeProjectLists(@Args('id', { type: () => String }) id: string) {
    return this.projectListsService.remove(id);
  }
}
