import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Group {
  @Field(() => ID, { description: 'Group ID', nullable: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Group Project', nullable: true })
  project: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Group Name', nullable: true })
  name: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'User',
  })
  @Field(() => [User], { description: 'Group Members', nullable: true })
  members: Array<MongooseSchema.Types.ObjectId>;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  @Field(() => User, { description: 'Group Admin', nullable: true })
  admin: MongooseSchema.Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
