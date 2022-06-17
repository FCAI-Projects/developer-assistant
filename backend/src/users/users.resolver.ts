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
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as axios from 'axios';

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
    const publicKey = this.generateRSAKeys(user._id);
    const token = this.createToken(user, publicKey);

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
    const publicKey = this.generateRSAKeys(user._id);
    const token = this.createToken(user, publicKey);

    return { token, userId: user.id };
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  deleteUser(@Args('id') id: string): Promise<UserDocument> {
    return this.usersService.deleteOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Context('req') context: any,
    @Args('user') user: UpdateUserInput,
  ): Promise<UserDocument> {
    if (user.password) {
      user.password = this.decryptData(user.password, context.user._id);
    }

    if (user.githubToken) {
      const code = this.decryptData(user.githubToken, context.user._id);

      const { data } = await axios.default.post(
        `https://github.com/login/oauth/access_token?client_id=87f2214968a5f4152fb9&client_secret=dde7b294a83bab32628557524a71be8f615b054b&code=${code}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      user.githubToken = data.access_token;
    }

    if (user.googleAppPassword) {
      user.googleAppPassword = this.decryptData(
        user.googleAppPassword,
        context.user._id,
      );
    }

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

  private createToken(user: UserDocument, key: string): string {
    return this.jwtService.sign({
      ...user.toObject({
        transform: (_, ret) => {
          delete ret.password;
          return ret;
        },
      }),
      key,
    });
  }

  private generateRSAKeys(userId: string) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
    fs.writeFileSync(`./keys/${userId}.pem`, privateKey);

    return publicKey;
  }

  private decryptData(data: string, userId: string) {
    const privateKey = fs.readFileSync(`./keys/${userId}.pem`, 'utf8');
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      // We convert the data string to a buffer using `Buffer.from`
      Buffer.from(data, 'base64'),
    );

    return decryptedData.toString();
  }
}
