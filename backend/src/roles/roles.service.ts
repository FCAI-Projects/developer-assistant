import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<RoleDocument> {
    const createdRole = new this.roleModel(createRoleInput);
    return createdRole.save();
  }

  async findAll(project): Promise<RoleDocument[]> {
    return this.roleModel.find({project});
  }

  async findOne(id: string): Promise<RoleDocument> {
    return this.roleModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateRoleInput: UpdateRoleInput,
  ): Promise<RoleDocument> {
    return this.roleModel.findByIdAndUpdate(id, updateRoleInput, {
      new: true,
    });
  }

  async remove(id: string): Promise<RoleDocument> {
    return this.roleModel.findByIdAndRemove(id);
  }
}
