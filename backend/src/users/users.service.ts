import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async deleteOne(id: string): Promise<User> {
    return this.userModel.findOneAndRemove({ _id: id });
  }

  async updateOne(id: string, user: UpdateUserInput): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, user);
  }
}
