import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Project {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  budget: number;

  @Field()
  clientEmail: string;

  @Field()
  describtion: string;
}

@InputType()
export class ProjectInput implements Partial<Project> {
  @Field()
  name: string;

  @Field()
  clientEmail: string;

  @Field()
  budget: number;

  @Field()
  describtion: string;
}

@InputType()
export class ProjectUpdateData implements Partial<Project> {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  budget: number;

  @Field({ nullable: true })
  describtion: string;
}
