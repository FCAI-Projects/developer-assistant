import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { CustomRoles, CustomRolesInput } from "./customRoles.schema";
import CustomRolesService from "./customRoles.service";
import { isValidObjectId }  from 'mongoose';

@Resolver((of) => CustomRoles)
export class CustomRolesResolver {
    private customRolesService: CustomRolesService;


    constructor(){
        this.customRolesService = new CustomRolesService();
    }

    @Query((returns) => [CustomRoles], { nullable: true })
    async getAllCustomRoles(@Arg("projectId") projectId: string) {
        return await this.customRolesService.getAllCustomRoles(projectId);
    }

    @Mutation((returns) => CustomRoles, { nullable: true })
    async addCusomRoles(@Arg("CustomRoles") customRolesInput: CustomRolesInput) {
        return this.customRolesService.createCustomRoles(customRolesInput);
    }

    @Mutation((returns) => CustomRoles, { nullable: true })
    async deleteCustomRoles(@Arg("customRoleId") _id: string) {
        const isVaild = isValidObjectId(_id);
        if(!isVaild)
            throw new Error("Invalid custom role id");
        else
            return this.customRolesService.deleteCustomRoles(_id);
    }
}