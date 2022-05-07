import {
  Body,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserInput } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Query((returns) => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findById(@Args('id') id: string): Promise<UserDocument> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserResponse> {
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
    const token = this.createToken(user);
    return { token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserResponse> {
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
    const token = this.createToken(user);
    return { token };
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  deleteUser(@Args('id') id: string): Promise<UserDocument> {
    return this.usersService.deleteOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Req() req: any,
    @Args('user') user: UpdateUserInput,
  ): Promise<UserDocument> {
    return this.usersService.updateOne(req.user.id, user);
  }

  private createToken(user: UserDocument): string {
    return this.jwtService.sign({
      ...user.toObject({
        transform: (_, ret) => {
          delete ret.password;
          return ret;
        },
      }),
    });
  }
}
