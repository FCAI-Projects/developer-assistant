import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskInput: CreateTaskInput): Promise<TaskDocument> {
    const task = new this.taskModel(createTaskInput);
    return task.save();
  }

  async findAll(project: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ project }).populate('assign').populate('status').populate('project');
  }

  async filter(filter: CreateTaskInput): Promise<TaskDocument[]> {
    return this.taskModel.find(filter).populate('assign').populate('status').populate('project');
  }

  async findOne(id: string): Promise<TaskDocument> {
    return this.taskModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateTaskInput: UpdateTaskInput,
  ): Promise<TaskDocument> {
    return this.taskModel.findOneAndUpdate({ _id: id }, updateTaskInput);
  }

  async remove(id: string): Promise<TaskDocument> {
    return this.taskModel.findOneAndRemove({ _id: id });
  }
}
