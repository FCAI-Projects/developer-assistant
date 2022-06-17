import {
  Body,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserInput } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UsersService } from './users.service';
import mongoose from 'mongoose';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream, mkdirSync } from 'fs';

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
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
    return { token, userId: user._id };
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
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!compareSync(password, user.password)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.createToken(user);

    return { token, userId: user.id };
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  deleteUser(@Args('id') id: string): Promise<UserDocument> {
    return this.usersService.deleteOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Context('req') context: any,
    @Args('user') user: UpdateUserInput,
  ): Promise<UserDocument> {
    return this.usersService.updateOne(context.user._id, user);
  }

  @Mutation(() => Boolean)
  async uploadAvatar(
    @Args('id') id: string,
    @Args({ name: 'avatar', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    mkdirSync(`./uploads/avatars`, { recursive: true });
    const newFileName = `${id}-${new Date().getTime()}-${filename.replace(
      /\s/g,
      '-',
    )}`;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/avatars/${newFileName}`))
        .on('finish', async () => {
          await this.usersService.updateOne(id, {
            avatar: newFileName,
          });
          resolve(true);
        })
        .on('error', (error) => {
          console.log('error', error);
          reject(false);
        }),
    );
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
