import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Comment {
  @Field(() => ID, { description: 'Comment ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ nullable: true, type: MongooseSchema.Types.ObjectId, ref: 'Comment' })
  @Field(() => String, { description: 'Relay to comment' })
  replayTo: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User ID' })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Task' })
  @Field(() => String, { description: 'Task ID' })
  task: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Comment Content' })
  content: String;

  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date

  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
