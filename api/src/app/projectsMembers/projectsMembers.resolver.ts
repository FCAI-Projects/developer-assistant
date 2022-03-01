import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { ProjectsMembers, ProjectsMembersInput } from "./projectsMembers.schema";
import ProjectsMembersService from "./projectsMembers.service";
import { isValidObjectId }  from 'mongoose';

@Resolver((of) => ProjectsMembers)
export class ProjectsMembersResolver {
    private ProjectsMembersService: ProjectsMembersService;

    constructor(){
        this.ProjectsMembersService = new ProjectsMembersService();
    }

    // [Queries] ...
    // Get all members of project ...
    @Query((returns) => [ProjectsMembers], { nullable: true })
    async getAllMembersOfProjects(@Arg("projectId") projectId: string) {
        return await this.ProjectsMembersService.getAllMembersOfProjects(projectId);
    }

    // [Queries] ...
    // Get all members of aspecific Role ...
    @Query((returns) => [ProjectsMembers], { nullable: true })
    async getAllMembersOfRole(@Arg("role") role: string) {
        return await this.ProjectsMembersService.getAllMembersOfRole(role);
    }

    // [Mutations] ...
    // Add user to project ...
    @Mutation((returns) => ProjectsMembers, { nullable: true })
    async createProjectRole(@Arg("ProjectsMembers") ProjectsMembersInput: ProjectsMembersInput) {
        return this.ProjectsMembersService.createProjectMember(ProjectsMembersInput);
    }

    // [Mutations] ...
    // Delete user from project ...
    @Mutation((returns) => ProjectsMembers, { nullable: true })
    async deleteProjectMembers(@Arg("ProjectsMembersId") _id: string) {
        const isVaild = isValidObjectId(_id);
        if(!isVaild)
            throw new Error("Invalid Project Member Id");
        else
            return this.ProjectsMembersService.deleteProjectMembers(_id);
    }
}