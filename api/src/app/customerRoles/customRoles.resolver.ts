import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { CustomRoles, CustomRolesInput } from "./customRoles.schema";
import CustomRolesService from "./customRoles.service";

@Resolver((of) => CustomRoles)
export class CustomRolesResolver {
    private customRolesService: CustomRolesService;


    constructor(){
        this.customRolesService = new CustomRolesService();
    }

    @Query((returns) => [CustomRoles], { nullable: true })
    async getCustomRoles() {
        return await this.customRolesService.getCustomRoles();
    }

    @Mutation((returns) => CustomRoles)
    async addCusomRoles(@Arg("CustomRoles") customRolesInput: CustomRolesInput) {
        return this.customRolesService.createCustomRoles(customRolesInput);
    }

    @Mutation((returns) => CustomRoles)
    async deleteCustomRoles(@Arg("CustomRoles") customRolesInput: CustomRolesInput) {
        return this.customRolesService.deleteCustomRoles(customRolesInput);
    }
}