import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectListsService } from './project-lists.service';
import { ProjectLists } from './entities/project-lists.entity';
import { CreateProjectListsInput } from './dto/create-project-lists.input';
import { UpdateProjectListsInput } from './dto/update-project-lists.input';

@Resolver(() => ProjectLists)
export class ProjectListsResolver {
  constructor(private readonly projectListsService: ProjectListsService) {}

  @Mutation(() => ProjectLists)
  async createProjectLists(
    @Args('createProjectListsInput')
    createProjectListsInput: CreateProjectListsInput,
  ) {
    const list = await this.projectListsService.findAll(
      createProjectListsInput.project,
    );
    return await this.projectListsService.create(
      createProjectListsInput,
      list.length,
    );
  }

  @Query(() => [ProjectLists], { name: 'projectLists' })
  async findAll(@Args('project', { type: () => String }) project: string) {
    return await this.projectListsService.findAll(project);
  }

  @Query(() => ProjectLists, { name: 'projectListsById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.projectListsService.findOne(id);
  }

  @Mutation(() => ProjectLists)
  async updateProjectLists(
    @Args('updateProjectListsInput')
    updateProjectListsInput: UpdateProjectListsInput,
  ) {
    return await this.projectListsService.update(
      updateProjectListsInput.id,
      updateProjectListsInput,
    );
  }

  @Mutation(() => ProjectLists)
  async removeProjectLists(@Args('id', { type: () => String }) id: string) {
    return await this.projectListsService.remove(id);
  }
}
