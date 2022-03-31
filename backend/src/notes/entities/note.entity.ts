import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Note {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Task Id'})
  taskId: string;

  @Prop()
  @Field(() => String, { description: 'User Id'})
  userId: string;

  @Prop()
  @Field(() => String, { description: 'Task Note'})
  note: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);