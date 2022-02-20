import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput } from "./user.schema";
import UserService from "./user.service";

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

  @Mutation((returns) => User)
  async addUser(@Arg("userInput") userInput: UserInput) {
    return this.userService.createUser(userInput);
  }
}
