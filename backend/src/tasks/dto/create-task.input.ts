import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'Task Project ID' })
  projectId: string;

  @Field(() => String, { description: 'Task name' })
  name: string;

  @Field(() => String, { description: 'Task description' })
  description: string;

  @Field(() => String, { description: 'Task assigned to', nullable: true })
  assign: string;

  @Field(() => [String], { description: 'Task attachments', nullable: true })
  attachments: Array<string>;

  @Field(() => String, { description: 'Task status', nullable: true })
  status: string;

  @Field(() => String, { description: 'Task periority', nullable: true })
  periority: string;

  @Field(() => [String], { description: 'Task tags', nullable: true })
  tags: Array<string>;

  @Field(() => Date, { description: 'Task started at', nullable: true })
  startedAt: Date;

  @Field(() => Date, { description: 'Task finished at', nullable: true })
  finishedAt: Date;

  @Field(() => Date, { description: 'Task deadline', nullable: true })
  deadline: Date;

  @Field(() => String, { description: 'Task docs', nullable: true })
  docs: string;
}
