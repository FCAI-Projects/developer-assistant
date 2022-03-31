import { UserInput } from './user.dto';
import { InputType, Field, PartialType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class LoginUser extends PartialType(UserInput) {
  @Field(() => String, { description: 'token of the user' })
  token: string;
}
