import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Note {
  @Field(() => ID, { description: 'Note ID', nullable: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Task' })
  @Field(() => Task, { description: 'Task Id', nullable: true })
  task: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User Id', nullable: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Task Note', nullable: true })
  note: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
