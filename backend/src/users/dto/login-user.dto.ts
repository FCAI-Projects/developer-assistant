import { UserInput } from './user.dto';
import { InputType, Field, PartialType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class LoginUser {
  @Field(() => String, { description: 'id of the user' })
  _id: string;

  @Field(() => String, { description: 'firstName of the user' })
  firstName: string;

  @Field(() => String, { description: 'lastName of the user' })
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;

  @Field(() => String, { description: 'token of the user' })
  token: string;
}
