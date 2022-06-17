import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User avatar', nullable: true })
  avatar?: string;

  @Field(() => String, { description: 'First Name of the user' })
  fname: string;

  @Field(() => String, { description: 'Last Name of the user' })
  lname: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
