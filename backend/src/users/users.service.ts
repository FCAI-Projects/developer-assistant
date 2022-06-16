import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.dto';
import { CreateUserInput } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<UserDocument> {
    createUserInput.password = await hash(createUserInput.password, 10);
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findOne(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id });
  }

  async deleteOne(id: string): Promise<UserDocument> {
    return this.userModel.findOneAndRemove({ _id: id });
  }

  async updateOne(id: string, user: UpdateUserInput): Promise<UserDocument> {
    if (user.password) user.password = await hash(user.password, 10);
    return this.userModel.findOneAndUpdate({ _id: id }, user);
  }
}
