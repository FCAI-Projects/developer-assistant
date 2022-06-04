import { CreateProjectListsInput } from './create-project-lists.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectListsInput extends PartialType(
  CreateProjectListsInput,
) {
  @Field(() => String)
  id: string;

  @Field(() => Int, { description: 'Status Index', nullable: true })
  index?: number;
}
