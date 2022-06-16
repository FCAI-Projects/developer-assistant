import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';


export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Project {
  @Field(() => ID, { description: 'Project ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Projact name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Client email' })
  clientEmail: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'Project owner' })
  owner: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Project describtion' })
  describtion: string;

  @Prop( {default:0 })
  @Field(() => Number, { description: 'Project Budget' })
  budget: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
