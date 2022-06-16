import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  project: string;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  createList?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  editList?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  deleteList?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  createTask?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  deleteTask?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  editTask?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  assignTask?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  unAssignTask?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  editDocs?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  canComment?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  editProject?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  manageRoles?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  manageExpenses?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  sendMails?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  managePayment?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  inviteMember?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  deleteMember?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  editMember?: boolean;
}
