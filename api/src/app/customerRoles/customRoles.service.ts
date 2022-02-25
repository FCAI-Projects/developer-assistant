import { Model } from "mongoose";
import CustomRolse, { CustomRolesInterface} from "../../models/customRoles.model";
import { CustomRolesInput } from "./customRoles.schema";

export default class  CustomRolesService {
    private customRolesModel: Model<CustomRolesInterface>;

    constructor() {
        this.customRolesModel = CustomRolse;
    }

    async getAllCustomRoles(projectId: string) : Promise<any> {
        return await this.customRolesModel.find({ projectId });
    }

    async createCustomRoles(customRoles: CustomRolesInput): Promise<any> {
        const newCustomRoles = new CustomRolse({
            ...customRoles,
        });
       return await newCustomRoles.save();
    }

    async deleteCustomRoles(customRoleId: string): Promise<any> {
        return await CustomRolse.findOneAndDelete({ _id: customRoleId });
    }
}