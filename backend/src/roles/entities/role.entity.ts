import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';

export type RoleDocument = Role & Document;

@Schema()
@ObjectType()
export class Role {
  @Field(() => ID, { description: 'Role ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Projact ID' })
  project: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Boolean, { description: 'User ID' })
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
