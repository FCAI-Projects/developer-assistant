import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  projectId: string;

  @Field(() => String)
  createTask: boolean;

  @Field(() => Boolean)
  deleteTask: boolean;

  @Field(() => Boolean)
  editTask: boolean;

  @Field(() => Boolean)
  assignTask: boolean;

  @Field(() => Boolean)
  editProject: boolean;

  @Field(() => Boolean)
  inviteToProject: boolean;

  @Field(() => Boolean)
  deleteMember: boolean;
}
