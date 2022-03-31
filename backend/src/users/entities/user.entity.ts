import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({required: true})
  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @Prop({required: true})
  @Field(() => String, { description: 'User last name' })
  lastName: string;

  @Prop({required: true, unique: true})
  @Field(() => String, { description: 'User email' })
  email: string;

  @Prop({required: true})
  @Field(() => String, { description: 'User password', nullable: true })
  password: string;
}



export const UserSchema = SchemaFactory.createForClass(User);
