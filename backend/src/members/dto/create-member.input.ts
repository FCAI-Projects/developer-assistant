import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  project: string;

  @Field(() => String)
  user: string;

  @Field(() => String)
  role: string;

  // @Field(() => String)
  // badges: string;
  @Field(() => String, {description: 'Member Status' , nullable: true})
  status: string;
}
