import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field(() => String, { description: 'Task Id' })
  task: string;

  @Field(() => String, { description: 'User Id' })
  user: string;

  @Field(() => String, { description: 'Task Note' })
  note: string;
}
