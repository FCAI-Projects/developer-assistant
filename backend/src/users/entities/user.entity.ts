import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User extends Document {
  @Field(() => ID, { description: 'User ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'User first name' })
  fname: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User last name' })
  lname: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User email' })
  email: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User password', nullable: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
