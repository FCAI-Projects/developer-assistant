import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop,  Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Comment {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;


@Prop()
@Field(() => String, { description: 'Comment  ID'})
  commntID: String;

  @Prop()
  @Field(() => String, { description: 'User ID'})
  userID: String;

  @Prop()
  @Field(() => String, { description: 'Comment Content'})
  note: String;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
