import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Context('req') context: any,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<ProjectDocument> {
    return this.projectsService.create(createProjectInput, context.user._id);
  }

  @Query(() => [Project], { name: 'projects' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context('req') context: any): Promise<ProjectDocument[]> {
    return this.projectsService.findMyPorjects(context.user._id);
  }

  @Query(() => Project, { name: 'project' })
  async findById(@Args('id') id: string): Promise<ProjectDocument> {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id') id: string,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ): Promise<ProjectDocument> {
    return this.projectsService.update(id, updateProjectInput);
  }

  @Mutation(() => Project)
  removeProject(@Args('id') id: string) {
    return this.projectsService.remove(id);
  }
}
