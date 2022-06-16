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
  createList: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  editList: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  deleteList: boolean;

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
  unAssignTask: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  editDocs: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  canComment: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  editProject: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  manageRoles: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  manageExpenses: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  sendMails: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  managePayment: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  inviteMember: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  deleteMember: boolean;

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  editMember: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
