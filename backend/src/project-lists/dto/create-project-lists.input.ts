import { InputType, Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateProjectListsInput {
  @Field(() => String, { description: 'Status Project ID' })
  project: string;

  @Field(() => String, { description: 'Status name' })
  name: string;

  @Field(() => [String], { description: 'Status tasks ID' })
  tasks: Array<string>;

  @Field(() => String, { description: 'Status Color' })
  color: string;

  @Field(() => Int, { description: 'Status Index' })
  index: number;
}
