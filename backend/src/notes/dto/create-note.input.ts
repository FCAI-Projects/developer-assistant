import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field(() => String, { description: 'Task Id' })
  taskId: string;

  @Field(() => String, { description: 'User Id' })
  userId: string;

  @Field(() => String, { description: 'Task Note' })
  note: string;
}
