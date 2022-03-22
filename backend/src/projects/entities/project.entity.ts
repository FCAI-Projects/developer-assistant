import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Project {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Projact name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Client email' })
  clientEmail: string;

  @Prop()
  @Field(() => String, { description: 'Project owner' })
  owner: string;

  @Prop()
  @Field(() => String, { description: 'Project describtion' })
  describtion: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
