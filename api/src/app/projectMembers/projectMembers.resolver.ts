import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { ProjectMembers, ProjectMembersInput } from "./projectMembers.schema";
import ProjectsMembersService from "./projectMembers.service";
import { isValidObjectId } from "mongoose";

@Resolver((of) => ProjectMembers)
export class ProjectsMembersResolver {
  private ProjectsMembersService: ProjectsMembersService;

  constructor() {
    this.ProjectsMembersService = new ProjectsMembersService();
  }

  @Query((returns) => [ProjectMembers], { nullable: true })
  async getAllMembersOfProject(@Arg("projectId") projectId: string) {
    return await this.ProjectsMembersService.getAllMembersOfProject(projectId);
  }

  @Query((returns) => [ProjectMembers], { nullable: true })
  async getAllMembersOfRole(@Arg("role") role: string) {
    return await this.ProjectsMembersService.getAllMembersOfRole(role);
  }

  @Mutation((returns) => ProjectMembers, { nullable: true })
  async createProjectRole(@Arg("ProjectMembers") ProjectsMembersInput: ProjectMembersInput) {
    return this.ProjectsMembersService.addProjectMember(ProjectsMembersInput);
  }

  @Mutation((returns) => ProjectMembers, { nullable: true })
  async deleteProjectMember(@Arg("ProjectsMembersId") _id: string) {
    const isVaild = isValidObjectId(_id);
    if (!isVaild) throw new Error("Invalid Project Member Id");
    else return this.ProjectsMembersService.deleteProjectMember(_id);
  }
}
