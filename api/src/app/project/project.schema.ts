import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Project {
  @Field()
  Pname: string;

  @Field()
  Pbudget: number;

  @Field()
  ClientEmail: string;

  @Field()
   Pdescribtion: string;
}

@InputType()
export class ProjectInput implements Partial<Project> {
  @Field()
  Pname: string;

  @Field()
  ClientEmail: string;
  
  @Field()
  Pbudget: number;

  @Field()
  Pdescribtion: string;
}

export class ProjectUpdateData implements Partial <Project>{
  @Field()
  Pname?: string ;

  @Field()
  Pbudget?: number ;

  @Field()
  Pdescribtion?: string ;

}