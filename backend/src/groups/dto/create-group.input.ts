import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field(() => String, { description: 'Group Project' })
  project: String;

  @Field(() => String, { description: 'Group Name' })
  name: String;

  @Field(() => [String], { description: 'Group Members' })
  members: Array<String>;
}
