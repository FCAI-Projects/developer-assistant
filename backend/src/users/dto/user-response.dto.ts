import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';

@ObjectType()
export class UserResponse {
  @Field(() => String, { description: 'Token of the user' })
  token: string;
}
