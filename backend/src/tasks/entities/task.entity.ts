import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export type TaskDocument = Task & Document;

@Schema()
@ObjectType()
export class Task extends Document {
  @Field(() => ID, { description: 'Task ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Task Project ID' })
  project: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Task name' })
  name: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Task description' })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'Task assigned to' })
  assign: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => [String], { description: 'Task attachments' })
  attachments: Array<string>;

  @Prop({ enum: ['todo', 'inprogress', 'done'] })
  @Field(() => String, { description: 'Task status' })
  status: string;

  @Prop({ enum: ['low', 'medium', 'high'] })
  @Field(() => String, { description: 'Task periority' })
  periority: string;

  @Prop()
  @Field(() => [String], { description: 'Task tags' })
  tags: Array<string>;

  @Prop()
  @Field(() => Date, { description: 'Task started at' })
  startedAt: Date;

  @Prop()
  @Field(() => Date, { description: 'Task finished at' })
  finishedAt: Date;

  @Prop()
  @Field(() => Date, { description: 'Task deadline' })
  deadline: Date;

  @Prop()
  @Field(() => String, { description: 'Task docs' })
  docs: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
