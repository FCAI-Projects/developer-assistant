import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Member } from './entities/member.entity';
import { Model } from 'mongoose';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
  ) {}

  async create(createMemberInput: CreateMemberInput): Promise<Member> {
    const createdMember = new this.memberModel(createMemberInput);
    return createdMember.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find();
  }

  async findOne(id: number): Promise<Member> {
    return this.memberModel.findOne({ id });
  }

  async update(
    id: number,
    updateMemberInput: UpdateMemberInput,
  ): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(id, updateMemberInput, {
      new: true,
    });
  }

  async remove(id: number): Promise<Member> {
    return this.memberModel.findByIdAndRemove(id);
  }
}
