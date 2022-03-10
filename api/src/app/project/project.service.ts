import { Model } from "mongoose";
import Project, { ProjectInterface } from "../../models/project.model";
import { ProjectInput, ProjectUpdateData } from "./project.schema";

export default class ProjectService {
  private ProjectModel: Model<ProjectInterface>;

  constructor() {
    this.ProjectModel = Project;
  }
  // Function to get all projects //
  async getProjects(): Promise<any> {
    return await this.ProjectModel.find();
  }
  // Function to get all projects by it's IDs //
  async getProjectsByID(_id: string): Promise<any> {
    return await this.ProjectModel.findOne({ _id });
  }

  // Function to create new project //
  async createProject(project: ProjectInput): Promise<any> {
    const newProject = new Project({
      ...project,
    });

    return await newProject.save();
  }
  // Function to edit in the project //
  async updateProject(_id: string, ProjectUpdateData: ProjectUpdateData): Promise<any> {
    return await this.ProjectModel.findByIdAndUpdate({ _id }, ProjectUpdateData, {
      new: true,
    });
  }
  // Function to remove project //
  async deleteProject(_id: string): Promise<any> {
    return await this.ProjectModel.findByIdAndDelete({ _id });
  }
  // Function to add badges to all projects //
  async addBadge(): Promise<any> {}
  // Function to edit badges in all projects //
  async updateBadge(): Promise<any> {}
  // Function to remove badge in projects //
  async delteBadge(): Promise<any> {}
}
