import { Model } from "mongoose";
import User, { UserInterface } from "../../models/user.model";
import { UserInput, UserUpdateInfo } from "./user.schema";

export default class UserService {
  private userModel: Model<UserInterface>;

  constructor() {
    this.userModel = User;
  }

  async createUser(user: UserInput): Promise<any> {
    const newuser = new User({
      ...user,
    });
    return await newuser.save();
  }

  async getUsers(): Promise<any> {
    return await this.userModel.find();
  }

  async getUserById(id: string): Promise<any> {
    return await this.userModel.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }

  async editUser(userId: string, userUpdateInfo: UserUpdateInfo): Promise<any> {
    return await this.userModel.findOneAndUpdate({ id: userId }, userUpdateInfo, {
      new: true,
    });
  }

  async deleteUser(userId: string): Promise<any> {
    return await this.userModel.findOneAndDelete({ id: userId });
  }
}
