import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectListsInput } from './dto/create-project-lists.input';
import { UpdateProjectListsInput } from './dto/update-project-lists.input';
import { Model } from 'mongoose';
import {
  ProjectLists,
  ProjectListsDocument,
} from './entities/project-lists.entity';

@Injectable()
export class ProjectListsService {
  constructor(
    @InjectModel(ProjectLists.name)
    private readonly taskModel: Model<ProjectListsDocument>,
  ) {}

  async create(
    createProjectListsInput: CreateProjectListsInput,
  ): Promise<ProjectListsDocument> {
    const createdProjectLists = new this.taskModel(createProjectListsInput);
    return await createdProjectLists.save();
  }

  async findAll(project: string): Promise<ProjectListsDocument[]> {
    return await this.taskModel
      .find({ project })
      .sort({ index: 1 })
      .populate('tasks')
      .populate('project');
  }

  async filter(filter: any): Promise<ProjectListsDocument[]> {
    return await this.taskModel.find(filter);
  }

  async findOne(id: string): Promise<ProjectListsDocument> {
    return await this.taskModel
      .findOne({ _id: id })
      .populate('tasks')
      .populate('project');
  }

  async update(
    id: string,
    updateProjectListsInput: UpdateProjectListsInput,
  ): Promise<ProjectListsDocument> {
    return await this.taskModel.findByIdAndUpdate(id, updateProjectListsInput, {
      new: true,
    });
  }

  async pushNewTask(id: string, task: string) {
    return await this.taskModel.findByIdAndUpdate(
      id,
      { $push: { tasks: task } },
      { new: true },
    );
  }

  async remove(id: string): Promise<ProjectListsDocument> {
    return await this.taskModel.findByIdAndRemove(id);
  }
}
