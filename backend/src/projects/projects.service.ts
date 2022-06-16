import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project, ProjectDocument } from './entities/project.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(
    createProjectInput: CreateProjectInput,
    owner: string,
  ): Promise<ProjectDocument> {
    const project = new this.projectModel({
      ...createProjectInput,
      owner,
    });
    return project.save();
  }

  async findMyPorjects(owner: string): Promise<ProjectDocument[]> {
    return this.projectModel.find({ owner }).populate('owner');
  }

  async findOne(id: string): Promise<ProjectDocument> {
    return this.projectModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateProjectInput: UpdateProjectInput,
  ): Promise<ProjectDocument> {
    return this.projectModel.findOneAndUpdate({ _id: id }, updateProjectInput);
  }

  async remove(id: string): Promise<ProjectDocument> {
    return this.projectModel.findOneAndRemove({ _id: id });
  }
}
