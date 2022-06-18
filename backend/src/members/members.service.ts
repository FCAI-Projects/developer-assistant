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
    return await createdMember.save();
  }

  async filter(filter: UpdateMemberInput): Promise<MemberDocument[]> {
    return await this.memberModel
      .find(filter)
      .populate('user')
      .populate('project');
  }

  async getUserProjects(user: string): Promise<MemberDocument[]> {
    return await this.memberModel
      .find({ user, status: 'joined' })
      .populate({ path: 'project', populate: { path: 'owner' } });
  }

  async findMembersByProject(projectId: string): Promise<MemberDocument[]> {
    return await this.memberModel
      .find({ project: projectId, status: 'joined' })
      .populate('user')
      .populate('project')
      .populate('role');
  }

  async findOne(id: string): Promise<MemberDocument> {
    return await this.memberModel
      .findOne({ id })
      .populate('user')
      .populate('project');
  }

  async findAllByRole(id: string): Promise<MemberDocument[]> {
    return await this.memberModel.find({ role: id });
  }

  async findUserInProject(
    user: string,
    project: string,
  ): Promise<MemberDocument> {
    return await (
      await this.memberModel.findOne({ user, project })
    )?.populate('role');
  }

  async update(
    id: string,
    updateMemberInput: UpdateMemberInput,
  ): Promise<MemberDocument> {
    return await this.memberModel.findByIdAndUpdate(id, updateMemberInput, {
      new: true,
    });
  }

  async remove(id: string): Promise<MemberDocument> {
    return await this.memberModel.findByIdAndRemove(id);
  }
}
