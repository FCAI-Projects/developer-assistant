import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  projectId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  role: string;

  @Field(() => String, { nullable: true })
  customId?: string;

  @Field(() => String)
  badges: string;
}
