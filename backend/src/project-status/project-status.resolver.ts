import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectStatusService } from './project-status.service';
import { ProjectStatus } from './entities/project-status.entity';
import { CreateProjectStatusInput } from './dto/create-project-status.input';
import { UpdateProjectStatusInput } from './dto/update-project-status.input';

@Resolver(() => ProjectStatus)
export class ProjectStatusResolver {
  constructor(private readonly projectStatusService: ProjectStatusService) {}

  @Mutation(() => ProjectStatus)
  createProjectStatus(
    @Args('createProjectStatusInput')
    createProjectStatusInput: CreateProjectStatusInput,
  ) {
    return this.projectStatusService.create(createProjectStatusInput);
  }

  @Query(() => [ProjectStatus], { name: 'projectStatus' })
  findAll(@Args('project', { type: () => String }) project: string) {
    return this.projectStatusService.findAll(project);
  }

  @Query(() => ProjectStatus, { name: 'projectStatusById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.projectStatusService.findOne(id);
  }

  @Mutation(() => ProjectStatus)
  updateProjectStatus(
    @Args('updateProjectStatusInput')
    updateProjectStatusInput: UpdateProjectStatusInput,
  ) {
    return this.projectStatusService.update(
      updateProjectStatusInput.id,
      updateProjectStatusInput,
    );
  }

  @Mutation(() => ProjectStatus)
  removeProjectStatus(@Args('id', { type: () => String }) id: string) {
    return this.projectStatusService.remove(id);
  }
}
