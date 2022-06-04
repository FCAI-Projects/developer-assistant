import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export type TimeTrackingDocument = TimeTracking & Document;

class TimeTrackingHistory {
  start: Date;
  end: Date;
  duration: number;
}

@Schema({ timestamps: true })
@ObjectType()
export class TimeTracking extends Document {
  @Field(() => ID, { description: 'Time Tracking ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Task' })
  @Field(() => Project, { description: 'Task ID' })
  task: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'Time Tracking of User' })
  assign: MongooseSchema.Types.ObjectId;

  @Prop({ default: 0 })
  @Field(() => String, { description: 'Time Tracking Duration' })
  duration: number;

  // @Prop({ required: true })
  // @Field(() => [TimeTrackingHistory], { description: 'Time Tracking History' })
  // history: Array<TimeTrackingHistory>;
}

export const TimeTrackingSchema = SchemaFactory.createForClass(TimeTracking);
