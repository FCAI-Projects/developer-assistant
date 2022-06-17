import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesService } from 'src/roles/roles.service';
import { resourceUsage } from 'process';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly rolesService: RolesService,
  ) {}

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Context('req') context: any,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<ProjectDocument> {
    const project = await this.projectsService.create(
      createProjectInput,
      context.user._id,
    );
    
    // Create base roles for project
    await this.rolesService.create({
      name: 'Admin',
      project: project._id,
      createList: true,
      editList: true,
      deleteList: true,
      createTask: true,
      editTask: true,
      deleteTask: true,
      assignTask: true,
      unAssignTask: true,
      editDocs: true,
      canComment: true,
      editProject: true,
      manageRoles: true,
      manageExpenses: true,
      sendMails: true,
      managePayment: true,
      inviteMember: true,
      deleteMember: true,
      editMember: true,
    });
    await this.rolesService.create({
      name: 'Member',
      project: project._id,
    });

    return project;
  }

  @Query(() => [Project], { name: 'projects' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context('req') context: any): Promise<ProjectDocument[]> {
    return await this.projectsService.findMyPorjects(context.user._id);
  }

  @Query(() => Project, { name: 'project' })
  async findById(@Args('id') id: string): Promise<ProjectDocument> {
    return await this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id') id: string,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ): Promise<ProjectDocument> {
    return await this.projectsService.update(id, updateProjectInput);
  }

  @Mutation(() => Project)
  async removeProject(@Args('id') id: string) {
    return await this.projectsService.remove(id);
  }
}
