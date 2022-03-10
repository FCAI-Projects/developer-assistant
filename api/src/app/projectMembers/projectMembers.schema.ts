import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class ProjectMembers {
  @Field()
  id: string;

  @Field()
  projectId: string;

  @Field()
  userId: string;

  @Field()
  role: string;

  @Field()
  customRoleId: string;

  @Field()
  badges: string;
}

@InputType()
export class ProjectMembersInput implements Partial<ProjectMembers> {
  @Field()
  projectId: string;

  @Field()
  userId: string;

  @Field()
  role: string;

  @Field()
  customRoleId: string;

  @Field()
  badges: string;
}
