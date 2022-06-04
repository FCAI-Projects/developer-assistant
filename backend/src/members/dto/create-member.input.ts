import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  project: string;

  @Field(() => String)
  user: string;

  @Field(() => String)
  role: string;

  @Field(() => String, { nullable: true })
  customRole?: string;

  @Field(() => String)
  badges: string;
}
