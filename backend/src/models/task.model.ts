import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  breed: string;

  @Prop()
  docs: string;

  @Prop()
  assign: Array<AssignInterface>;

  @Prop()
  attachments: string;

  @Prop({ enum: ['Todo', 'Doing', 'Done'] })
  status: string;

  @Prop({ enum: ['Low', 'Medium', 'High'] })
  periority: string;

  @Prop()
  tags: Array<string>;

  @Prop()
  startedAt: Date;

  @Prop()
  deadliene: Date;

  @Prop()
  finishedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

interface AssignInterface {
  userId: string;
  finished: boolean;
  finishedAt: Date;
  stage: number;
}
