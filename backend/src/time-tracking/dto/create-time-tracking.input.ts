import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTimeTrackingInput {
  @Field(() => String, { description: 'Task ID' })
  task: String;

  @Field(() => String, { description: 'Time Tracking of User' })
  user: String;

  @Field(() => Date, {
    description: 'Time Tracking Started & Not Finished Yet',
  })
  start: Date;
}
