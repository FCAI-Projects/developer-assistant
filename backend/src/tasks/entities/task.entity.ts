import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
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
  @Field(() => User, { description: 'Task assigned to', nullable: true })
  assign: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => [String], { description: 'Task attachments', nullable: true })
  attachments: Array<string>;

  @Prop({ enum: ['todo', 'doing', 'done'] })
  @Field(() => String, { description: 'Task status', nullable: true })
  status: string;

  @Prop({ enum: ['low', 'medium', 'high'] })
  @Field(() => String, { description: 'Task periority', nullable: true })
  periority: string;

  @Prop()
  @Field(() => [String], { description: 'Task tags', nullable: true })
  tags: Array<string>;

  @Prop()
  @Field(() => Date, { description: 'Task started at', nullable: true })
  startedAt: Date;

  @Prop()
  @Field(() => Date, { description: 'Task finished at', nullable: true })
  finishedAt: Date;

  @Prop()
  @Field(() => Date, { description: 'Task deadline', nullable: true })
  deadline: Date;

  @Prop()
  @Field(() => String, { description: 'Task docs', nullable: true })
  docs: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
