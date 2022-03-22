import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const createdRole = new this.roleModel(createRoleInput);
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find();
  }

  async findOne(id: number): Promise<Role> {
    return this.roleModel.findOne({ _id: id });
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    return this.roleModel.findByIdAndUpdate(id, updateRoleInput, {
      new: true,
    });
  }

  async remove(id: number): Promise<Role> {
    return this.roleModel.findByIdAndRemove(id);
  }
}
