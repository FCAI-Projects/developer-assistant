import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Project, ProjectInput, ProjectUpdateData } from "./project.schema";
import ProjectService from "./project.service";
import { isValidObjectId } from "mongoose";
import { pid } from "process";

@Resolver((of) => Project)
export class ProjectResolver {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }
// Querys for return data
  @Query((returns) => [Project], { nullable: true })
  async getprojects() {
    return await this.projectService.getProjects();
  }
  @Query((returns) => Project, { nullable: true })
  async getUser(@Arg("projectId") _id: string) {
    // check if _id of that project is valid or not 
    const isVaild = isValidObjectId(_id);
    if(!isVaild)
      throw new Error("Invalid project id");
    else
    return await this.projectService.getProjectsByID(_id);
  }
  
// Mutations for update data
  @Mutation((returns) => Project)
  async createProject(@Arg("userInput") projectInput: ProjectInput) {
    return this.projectService.createProject(projectInput);
  }

  @Mutation((returns) => Project, { nullable: true })
  async UpdateProject(@Arg("projectId") _id: string, @Arg("projectInput") ProjectUpdateData: ProjectUpdateData) {
    // check if _id of that project is valid or not 
    const isVaild = isValidObjectId(_id);
    if(!isVaild)
      throw new Error("Invalid project id");
    else
   return await this.projectService.updateProject(_id, ProjectUpdateData)
  }

  @Mutation((returns) => Project, { nullable: true })
  async deleteProject(@Arg("projectId") _id: string) {
   // check if _id of that project is valid or not
    const isVaild = isValidObjectId(_id);
    if(!isVaild)
      throw new Error("Invalid project id");
    else
      return this.projectService.deleteProject(_id);
  }
}
