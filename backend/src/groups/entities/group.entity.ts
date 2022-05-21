import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Group {
  @Field(() => ID, { description: 'Group ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => String, { description: 'Group Project' })
  project: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Group Name' })
  name: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'User',
  })
  @Field(() => String, { description: 'Group Members' })
  members: Array<MongooseSchema.Types.ObjectId>;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  @Field(() => String, { description: 'Group Admin' })
  admin: MongooseSchema.Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
