import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { description: 'Comment ID' })
  commentId: String;

  @Field(() => String, { description: 'User ID' })
  userID: String;

  @Field(() => String, { description: 'Comment Content' })
  commentContent: String;
}
