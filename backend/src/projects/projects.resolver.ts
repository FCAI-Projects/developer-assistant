import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Field,
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { HttpException, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesService } from 'src/roles/roles.service';
import { MembersService } from 'src/members/members.service';
import { UsersService } from 'src/users/users.service';
import * as nodemailer from 'nodemailer';
import * as axios from 'axios';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
    private readonly membersService: MembersService,
  ) {}

  @Mutation(() => Project)
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Context('req') context: any,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @Args('github') github: boolean,
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

    if (github) {
      await this.createGithubRepo(project, context.user._id);
    }

    return project;
  }

  @Query(() => [Project], { name: 'projects' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Context('req') context: any): Promise<ProjectDocument[]> {
    const projects = await this.projectsService.findMyPorjects(
      context.user._id,
    );
    const memberIn = await this.membersService.getUserProjects(
      context.user._id,
    );

    memberIn.forEach((member) => {
      projects.push(member.project);
    });

    return projects;
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

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async sendMail(
    @Context('req') context: any,
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('message') message: string,
  ): Promise<boolean> {
    const project = await this.projectsService.findOne(id);
    const user = await this.usersService.findOne(context.user._id);

    if (!user.googleAppPassword) {
      throw new HttpException("You don't have a google app password", 401);
    }
    console.log();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user.email,
        pass: user.googleAppPassword,
      },
    });

    const mailOptions = {
      from: user.email,
      to: project.clientEmail,
      subject: title,
      text: message,
      html: `<p>${message}</p>`,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  private async createGithubRepo(project: ProjectDocument, userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user.connectedWihGithub)
      throw new HttpException('You are not connected with github', 401);

    const { data } = await axios.default.post(
      'https://api.github.com/user/repos',
      { name: project.name },
      {
        headers: {
          Authorization: `token ${user.githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    if (data)
      await this.projectsService.update(project._id, {
        gihubRepo: data.full_name,
      });

    console.log(data);
  }
}
