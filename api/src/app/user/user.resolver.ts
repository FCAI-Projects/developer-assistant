import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput, UserUpdateInfo } from "./user.schema";
import UserService from "./user.service";
import { isValidObjectId } from "mongoose";
import { hashSync } from "bcryptjs";

@Resolver((of) => User)
export class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Query((returns) => [User], { nullable: true })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Query((returns) => User, { nullable: true })
  async getUser(@Arg("userId") id: string) {
    const isVaild = isValidObjectId(id);
    if (!isVaild) throw new Error("Invalid user id");
    else return await this.userService.getUserById(id);
  }

  @Mutation((returns) => User, { nullable: true })
  async addUser(@Arg("userInput") userInput: UserInput) {
    const userExists = await this.userService.getUserByEmail(userInput.email);
    if (userExists) {
      throw new Error("Email already exists");
    }
    userInput.password = hashSync(userInput.password, 10);
    return this.userService.createUser(userInput);
  }

  @Mutation((returns) => User, { nullable: true })
  async editUser(@Arg("userId") id: string, @Arg("userInput") userUpdateInfo: UserUpdateInfo) {
    const isVaild = isValidObjectId(id);
    if (!isVaild) throw new Error("Invalid user id");
    else return await this.userService.editUser(id, userUpdateInfo);
  }

  @Mutation((returns) => User, { nullable: true })
  async deleteUser(@Arg("userId") id: string) {
    const isVaild = isValidObjectId(id);
    if (!isVaild) throw new Error("Invalid user id");
    else return this.userService.deleteUser(id);
  }
}
