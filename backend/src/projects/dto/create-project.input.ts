import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field(() => String, { description: 'project name' })
  name: string;

  @Field(() => String, { description: 'client email' })
  clientEmail: string;

  @Field(() => String, { description: 'owner of the project' })
  owner: string;

  @Field(() => String, { description: 'description of project' })
  describtion: string;
}
