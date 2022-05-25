import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { description: 'Comment ID', nullable: true })
  replayTo?: String;

  @Field(() => String, { description: 'User ID' })
  user: String;

  @Field(() => String, { description: 'Comment Content' })
  content: String;
}
