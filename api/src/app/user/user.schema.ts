import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserUpdateInfo implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;
}
