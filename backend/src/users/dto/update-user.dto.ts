import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  googleAppPassword?: string;

  @Field(() => String, { nullable: true })
  githubToken?: string;

  @Field(() => Boolean, { nullable: true })
  connectedWihGoogle?: boolean;

  @Field(() => Boolean, { nullable: true })
  connectedWihGithub?: boolean;
}
