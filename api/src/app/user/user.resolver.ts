import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput, UserUpdateInfo } from "./user.schema";
import UserService from "./user.service";
import { isValidObjectId }  from 'mongoose';
import { hashSync } from "bcryptjs";

@Resolver((of) => User)
export class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++ query

  @Query((returns) => [User], { nullable: true })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Query((returns) => User, { nullable: true })
  async getUser(@Arg("userId") _id: string) {
    // check if _id is valid or not to avoid mongoose error
    const isVaild = isValidObjectId(_id);
    if(!isVaild)
      throw new Error("Invalid user id");
    else
    return await this.userService.getUserById(_id);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++ mutation

  @Mutation((returns) => User, { nullable: true })
  async addUser(@Arg("userInput") userInput: UserInput) {
    // if email exists before
    const userExists = await this.userService.getUserByEmail(userInput.email);
    if(userExists) {
      throw new Error("Email already exists");
    }
    userInput.password = hashSync(userInput.password, 10);
    return this.userService.createUser(userInput);
  }

  @Mutation((returns) => User, { nullable: true })
  async editUser(@Arg("userId") _id: string, @Arg("userInput") userUpdateInfo: UserUpdateInfo) {
    // check if _id is valid or not to avoid mongoose error
    const isVaild = isValidObjectId(_id);
    if(!isVaild)
      throw new Error("Invalid user id");
    else
    return await this.userService.editUser(_id, userUpdateInfo);
  }

  @Mutation((returns) => User, { nullable: true })
  async deleteUser(@Arg("userId") _id: string) {
    // check if _id is valid or not to avoid mongoose error
    const isVaild = isValidObjectId(_id);
    if(!isVaild)
      throw new Error("Invalid user id");
    else
      return this.userService.deleteUser(_id);
  }
}

