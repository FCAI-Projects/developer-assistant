import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Role {
  @Field(() => ID, { description: 'Role ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Project ID' })
  project: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Role Name' })
  name: string;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  createTask: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  deleteTask: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  editTask: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  assignTask: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  editProject: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  inviteToProject: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  deleteMember: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
