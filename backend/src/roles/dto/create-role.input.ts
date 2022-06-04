import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  project: string;

  @Field(() => Boolean, { defaultValue: false })
  createTask?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  deleteTask?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  editTask?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  assignTask?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  editProject?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  inviteToProject?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  deleteMember?: boolean;
}
