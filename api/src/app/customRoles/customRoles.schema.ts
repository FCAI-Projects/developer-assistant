import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class CustomRoles {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  projectId: string;

  @Field()
  createTask: boolean;

  @Field()
  deleteTask: boolean;

  @Field()
  editTask: boolean;

  @Field()
  assignTask: boolean;

  @Field()
  editProject: boolean;

  @Field()
  inviteToProject: boolean;

  @Field()
  deleteMember: boolean;
}

@InputType()
export class CustomRolesInput implements Partial<CustomRoles> {
  @Field()
  name: string;

  @Field()
  projectId: string;

  @Field({ defaultValue: false })
  createTask: boolean;

  @Field({ defaultValue: false })
  deleteTask: boolean;

  @Field({ defaultValue: false })
  editTask: boolean;

  @Field({ defaultValue: false })
  assignTask: boolean;

  @Field({ defaultValue: false })
  editProject: boolean;

  @Field({ defaultValue: false })
  inviteToProject: boolean;

  @Field({ defaultValue: false })
  deleteMember: boolean;
}
