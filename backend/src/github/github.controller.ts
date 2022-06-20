import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';
import * as axios from 'axios';

@Controller('github')
export class GithubController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/pulls/:id')
  async getGithubPulls(@Param('id') id: string): Promise<any> {
    const project = await this.projectsService.findOne(id);
    if (!project.gihubRepo) {
      throw new HttpException('Github repo not found', 404);
    }
    const user = await this.usersService.findOne(project.owner.toString());
    const { data } = await axios.default.get(
      `https://api.github.com/repos/${project.gihubRepo}/pulls`,
      {
        headers: {
          Authorization: `token ${user.githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );
    return data;
  }
}
