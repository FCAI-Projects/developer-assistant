import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Project, ProjectInput, ProjectUpdateData } from "./project.schema";
import ProjectService from "./project.service";
import { isValidObjectId } from "mongoose";

@Resolver((of) => Project)
export class ProjectResolver {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  @Query((returns) => [Project], { nullable: true })
  async getProjects() {
    return await this.projectService.getProjects();
  }

  @Query((returns) => Project, { nullable: true })
  async getUser(@Arg("projectId") id: string) {
    const isVaild = isValidObjectId(id);
    if (!isVaild) throw new Error("Invalid project id");
    else return await this.projectService.getProjectsByID(id);
  }

  @Mutation((returns) => Project)
  async createProject(@Arg("userInput") projectInput: ProjectInput) {
    return this.projectService.createProject(projectInput);
  }

  @Mutation((returns) => Project, { nullable: true })
  async UpdateProject(@Arg("projectId") id: string, @Arg("projectUpdateData") projectUpdateData: ProjectUpdateData) {
    const isVaild = isValidObjectId(id);
    if (!isVaild) throw new Error("Invalid project id");
    else return await this.projectService.updateProject(id, projectUpdateData);
  }

  @Mutation((returns) => Project, { nullable: true })
  async deleteProject(@Arg("projectId") _id: string) {
    const isVaild = isValidObjectId(_id);
    if (!isVaild) throw new Error("Invalid project id");
    else return this.projectService.deleteProject(_id);
  }
}
