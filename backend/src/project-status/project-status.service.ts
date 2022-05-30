import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectStatusInput } from './dto/create-project-status.input';
import { UpdateProjectStatusInput } from './dto/update-project-status.input';
import { Model } from 'mongoose';
import {
  ProjectStatus,
  ProjectStatusDocument,
} from './entities/project-status.entity';

@Injectable()
export class ProjectStatusService {
  constructor(
    @InjectModel(ProjectStatus.name)
    private readonly taskModel: Model<ProjectStatusDocument>,
  ) {}

  async create(
    createProjectStatusInput: CreateProjectStatusInput,
  ): Promise<ProjectStatusDocument> {
    const createdProjectStatus = new this.taskModel(createProjectStatusInput);
    return await createdProjectStatus.save();
  }

  async findAll(project: string): Promise<ProjectStatusDocument[]> {
    return await this.taskModel.find({ project });
  }

  async findOne(id: string): Promise<ProjectStatusDocument> {
    return await this.taskModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateProjectStatusInput: UpdateProjectStatusInput,
  ): Promise<ProjectStatusDocument> {
    return await this.taskModel.findByIdAndUpdate(
      id,
      updateProjectStatusInput,
      { new: true },
    );
  }

  async remove(id: string): Promise<ProjectStatusDocument> {
    return await this.taskModel.findByIdAndRemove(id);
  }
}
