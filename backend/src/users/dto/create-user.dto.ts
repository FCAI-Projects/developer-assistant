import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name of the user' })
  name: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;
}
