import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.deleteOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('user') user: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateOne(id, user);
  }
}
