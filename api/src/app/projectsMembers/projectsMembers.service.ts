import { Model } from "mongoose";
import ProjectsMembers, { ProjectsMembersInterface } from "../../models/projectsMembers.model";
import { ProjectsMembersInput } from "./projectsMembers.schema";

export default class ProjectsMembersService {
    private projectsMembersModel: Model<ProjectsMembersInterface>;

    constructor() {
        this.projectsMembersModel = ProjectsMembers;
    }

    // Get all members of project ...
    async getAllMembersOfProjects(projectId: string) : Promise<any> {
        return await this.projectsMembersModel.find({ projectId });
    }

    // Get all members of aspecific Role ...
    async getAllMembersOfRole(role: string) : Promise<any> {2
        return await this.projectsMembersModel.find({ role });
    }    

    // Add user to project ...
    async createProjectMember(projectsMembers: ProjectsMembersInput): Promise<any> {
        const newProjectsRole = new ProjectsMembers({
            ...projectsMembers,
        });
       return await newProjectsRole.save();
    }

    // Delete user from project ...
    async deleteProjectMembers(projectMemberId: string): Promise<any> {
        return await ProjectsMembers.findOneAndDelete({ _id: projectMemberId });
    }
}