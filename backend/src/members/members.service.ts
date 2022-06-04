import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Member, MemberDocument } from './entities/member.entity';
import { Model } from 'mongoose';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) {}

  async create(createMemberInput: CreateMemberInput): Promise<MemberDocument> {
    const createdMember = new this.memberModel(createMemberInput);
    return createdMember.save();
  }

  async filter(filter: UpdateMemberInput): Promise<MemberDocument[]> {
    return this.memberModel.find(filter).populate('user').populate('project');
  }

  async findOne(id: string): Promise<MemberDocument> {
    return this.memberModel.findOne({ id }).populate('user').populate('project');
  }

  async update(
    id: string,
    updateMemberInput: UpdateMemberInput,
  ): Promise<MemberDocument> {
    return this.memberModel.findByIdAndUpdate(id, updateMemberInput, {
      new: true,
    });
  }

  async remove(id: string): Promise<MemberDocument> {
    return this.memberModel.findByIdAndRemove(id);
  }
}
