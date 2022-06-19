import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTimeTrackingInput } from './dto/create-time-tracking.input';
import { UpdateTimeTrackingInput } from './dto/update-time-tracking.input';
import {
  TimeTracking,
  TimeTrackingDocument,
} from './entities/time-tracking.entity';
import { Model } from 'mongoose';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectModel(TimeTracking.name)
    private TimeTrackingModel: Model<TimeTrackingDocument>,
  ) {}

  async create(
    createTimeTrackingInput: CreateTimeTrackingInput,
  ): Promise<TimeTracking> {
    const createdTimeTracking = new this.TimeTrackingModel(
      createTimeTrackingInput,
    );
    return await createdTimeTracking.save();
  }

  async findAll(): Promise<TimeTracking[]> {
    return await this.TimeTrackingModel.find();
  }

  async filter(filter: any): Promise<TimeTracking[]> {
    return await this.TimeTrackingModel.find(filter).populate('task');
  }

  async findOneByTask(task: string, user: string): Promise<TimeTracking> {
    return await this.TimeTrackingModel.findOne({ task, user });
  }

  async startTimeForTask(task: string, user: string): Promise<any> {
    return await this.TimeTrackingModel.updateOne(
      { task, user },
      { start: new Date() },
    );
  }

  async pushNewHistory(id: string, history: any): Promise<any> {
    return await this.TimeTrackingModel.findByIdAndUpdate(
      id,
      {
        $push: {
          history: history,
        },
      },
      { new: true },
    );
  }

  async update(
    id: string,
    updateTimeTrackingInput: UpdateTimeTrackingInput,
  ): Promise<TimeTracking> {
    return await this.TimeTrackingModel.findByIdAndUpdate(
      id,
      updateTimeTrackingInput,
      { new: true },
    );
  }

  async remove(id: string): Promise<TimeTracking> {
    return await this.TimeTrackingModel.findByIdAndRemove(id);
  }
}
