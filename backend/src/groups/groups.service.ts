import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group, GroupDocument } from './entities/group.entity';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async create(
    createGroupInput: CreateGroupInput,
    admin: string,
  ): Promise<GroupDocument> {
    const createdGroup = new this.groupModel({ ...createGroupInput, admin });
    return await createdGroup.save();
  }

  async findAll(user: string): Promise<GroupDocument[]> {
    return await this.groupModel
      .find({ $or: [{ admin: user }, { members: user }] })
      .populate('members')
      .populate('project')
      .populate('admin');
  }

  async findOne(id: string): Promise<GroupDocument> {
    return await this.groupModel.findById(id);
  }

  async update(
    id: string,
    updateGroupInput: UpdateGroupInput,
  ): Promise<GroupDocument> {
    return await this.groupModel.findByIdAndUpdate(id, updateGroupInput, {
      new: true,
    });
  }

  async inviteMember(id: string, member: string): Promise<GroupDocument> {
    return await this.groupModel.findByIdAndUpdate(
      id,
      { members: { $push: member } },
      {
        new: true,
      },
    );
  }

  async removeMember(id: string): Promise<any> {
    const group = await this.groupModel.find({ members: id });
    if (group.length > 0) {
      await this.groupModel.updateMany(
        { members: { $in: id } },
        { members: { $pull: id } },
        { new: true },
      );
    }
  }

  async remove(id: string): Promise<GroupDocument> {
    return await this.groupModel.findByIdAndRemove(id);
  }

  async checkMember(id: string, userId: string): Promise<GroupDocument> {
    return await this.groupModel.findOne({ id });
  }
}
