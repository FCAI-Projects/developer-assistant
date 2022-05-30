import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectStatusInput {
  @Field(() => String, { description: 'Status Project ID' })
  project: string;

  @Field(() => String, { description: 'Status name' })
  name: string;

  @Field(() => String, { description: 'Status Color' })
  color: string;
}
