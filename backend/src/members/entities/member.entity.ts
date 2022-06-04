import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Project, ProjectDocument } from 'src/projects/entities/project.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Role, RoleDocument } from 'src/roles/entities/role.entity';

export type MemberDocument = Member & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Member {
  @Field(() => ID, { description: 'Member ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Projact ID' })
  project: ProjectDocument;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User ID' })
  user: UserDocument;

  @Prop({ nullable: true, type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  @Field(() => Role, { nullable: true, description: 'User role in project' })
  role: RoleDocument;

  // @Prop()
  // @Field(() => String, { description: 'User Badge' })
  // badges: string;

  @Prop({ enum: ['declined', 'joined', 'pending'], default: 'pending' })
  @Field(() => String, { description: 'User Status' })
  status: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
