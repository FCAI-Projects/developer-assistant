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
    return this.taskModel
      .find({ project })
      .populate('assign')
      .populate('project');
  }

  async findByUser(assign: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ assign, status: { $in: ['todo', 'doing'] } })
      .populate('assign')
      .populate('project');
  }

  async filter(filter: CreateTaskInput): Promise<TaskDocument[]> {
    return this.taskModel.find(filter).populate('assign').populate('project');
  }

  async findOne(id: string): Promise<TaskDocument> {
    return this.taskModel
      .findOne({ _id: id })
      .populate('assign')
      .populate('project');
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
