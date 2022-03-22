import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class Member {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Projact ID' })
  projectId: string;

  @Prop()
  @Field(() => String, { description: 'User ID' })
  userId: string;

  @Prop()
  @Field(() => String, { description: 'User role in project' })
  role: string;

  @Prop({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Custom Role ID' })
  customId?: string;

  @Prop()
  @Field(() => String, { description: 'User Badge' })
  badges: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
