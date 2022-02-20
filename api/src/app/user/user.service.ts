import { Model } from "mongoose";
import User, { UserInterface } from "../../models/user.model";
import { UserInput } from "./user.schema";

export default class UserService {
  private userModel: Model<UserInterface>;
  constructor() {
    this.userModel = User;
  }

  async getUsers(): Promise<any> {
    return await this.userModel.find();
  }

  async createUser(user: UserInput): Promise<any> {
    const newuser = new User({
      ...user,
    });

    return await newuser.save();
  }
}
