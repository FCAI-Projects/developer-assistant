import { Model } from "mongoose";
import CustomRolse, { CustomRolesInterface } from "../../models/customRoles.model";
import { CustomRolesInput } from "./customRoles.schema";

export default class CustomRolesService {
  private customRolesModel: Model<CustomRolesInterface>;

  constructor() {
    this.customRolesModel = CustomRolse;
  }

  // Get all custom roles of the project ...
  async getAllCustomRoles(projectId: string): Promise<any> {
    return await this.customRolesModel.find({ projectId });
  }

  // Add a new custom role ...
  async createCustomRoles(customRoles: CustomRolesInput): Promise<any> {
    const newCustomRoles = new CustomRolse({
      ...customRoles,
    });
    return await newCustomRoles.save();
  }

  // Delete custom role ...
  async deleteCustomRoles(customRoleId: string): Promise<any> {
    return await CustomRolse.findOneAndDelete({ _id: customRoleId });
  }
}
