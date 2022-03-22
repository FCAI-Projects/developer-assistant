import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const project = new this.projectModel(createProjectInput);
    return project.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectModel.findOne({ _id: id });
  }

  async update(
    id: number,
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    return this.projectModel.findOneAndUpdate({ _id: id }, updateProjectInput);
  }

  async remove(id: number): Promise<Project> {
    return this.projectModel.findOneAndRemove({ _id: id });
  }
}
