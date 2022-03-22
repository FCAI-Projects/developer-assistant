import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class Role {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Projact ID' })
  projectId: string;

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
