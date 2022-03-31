import { Body, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CreateUserInput } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const existUser = await this.usersService.findUserByEmail(
      createUserInput.email,
    );
    if (existUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'User already exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.usersService.createUser(createUserInput);
    user.password = undefined;
    return user;
  }

  @Mutation(() => LoginUser)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'User not found',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!compareSync(password, user.password)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    user.password = undefined;
    const token = this.createToken(user);

    return {...user, token};
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


  createToken(user: User): string {
    return this.jwtService.sign({
      ...user
    });
  }
}
