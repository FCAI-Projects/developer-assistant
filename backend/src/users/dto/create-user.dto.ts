import { UserInput } from './user.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput extends PartialType(UserInput) {
  @Field(() => String, { description: 'firstName of the user' })
  firstName: string;

  @Field(() => String, { description: 'lastName of the user' })
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;
}
