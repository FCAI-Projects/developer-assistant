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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User ID' })
  user: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Comment Content' })
  note: String;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
