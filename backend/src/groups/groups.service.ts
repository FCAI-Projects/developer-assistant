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

  async findAll(): Promise<GroupDocument[]> {
    return await this.groupModel.find();
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

  async remove(id: string): Promise<GroupDocument> {
    return await this.groupModel.findByIdAndRemove(id);
  }
}
