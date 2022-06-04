import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { Task, TaskDocument } from 'src/tasks/entities/task.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';

export type TimeTrackingDocument = TimeTracking & Document;
@ObjectType()
class TimeTrackingHistory {
  @Field(() => Date, { description: 'History Start' })
  start: Date;

  @Field(() => Date, { description: 'History End' })
  end: Date;

  @Field(() => Number, { description: 'History Duration' })
  duration: number;
}

@Schema({ timestamps: true })
@ObjectType()
export class TimeTracking extends Document {
  @Field(() => ID, { description: 'Time Tracking ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Task' })
  @Field(() => Task, { description: 'Task ID' })
  task: TaskDocument;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'Time Tracking of User' })
  user: UserDocument;

  @Prop()
  @Field(() => Date, {
    description: 'Time Tracking Started & Not Finished Yet',
  })
  start: Date;

  @Prop({ default: 0 })
  @Field(() => String, { description: 'Time Tracking Duration' })
  duration: number;

  @Prop()
  @Field(() => [TimeTrackingHistory], { description: 'Time Tracking History' })
  history: Array<TimeTrackingHistory>;
}

export const TimeTrackingSchema = SchemaFactory.createForClass(TimeTracking);
