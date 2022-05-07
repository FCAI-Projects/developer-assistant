import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

export type MemberDocument = Member & Document;

@Schema()
@ObjectType()
export class Member {
  @Field(() => ID, { description: 'Member ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Projact ID' })
  project: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User ID' })
  user: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User role in project' })
  role: string;

  @Prop({ nullable: true, type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  @Field(() => Role, { nullable: true, description: 'Custom Role' })
  customRole?: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User Badge' })
  badges: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
