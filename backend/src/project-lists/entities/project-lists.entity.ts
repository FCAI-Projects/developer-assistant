import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';

export type ProjectListsDocument = ProjectLists & Document;

@Schema({ timestamps: true })
@ObjectType()
export class ProjectLists extends Document {
  @Field(() => ID, { description: 'List ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'List Project ID' })
  project: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Status name' })
  name: string;

  @Prop({ required: true, type: [MongooseSchema.Types.ObjectId], ref: 'Task' })
  @Field(() => [Task], { description: 'Status Tasks ID' })
  tasks: Array<MongooseSchema.Types.ObjectId>;

  @Prop()
  @Field(() => String, { description: 'Status Color' })
  color: string;
}

export const ProjectListsSchema = SchemaFactory.createForClass(ProjectLists);
