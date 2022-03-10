import { Model } from "mongoose";
import ProjectMembers, { ProjectMembersInterface } from "../../models/projectMembers.model";
import { ProjectMembersInput } from "./projectMembers.schema";

export default class ProjectMembersService {
  private projectMembersModel: Model<ProjectMembersInterface>;

  constructor() {
    this.projectMembersModel = ProjectMembers;
  }

  async getAllMembersOfProject(projectId: string): Promise<any> {
    return await this.projectMembersModel.find({ projectId });
  }

  async getAllMembersOfRole(role: string): Promise<any> {
    return await this.projectMembersModel.find({ role });
  }

  async addProjectMember(projectsMembers: ProjectMembersInput): Promise<any> {
    const newMember = new ProjectMembers({
      ...projectsMembers,
    });
    return await newMember.save();
  }

  async deleteProjectMember(id: string): Promise<any> {
    return await this.projectMembersModel.findByIdAndDelete(id);
  }
}
