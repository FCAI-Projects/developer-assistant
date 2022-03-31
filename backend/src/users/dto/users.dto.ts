import {Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => String, { description: 'id of the user' })
  _id: any;

  @Field(() => String, { description: 'firstName of the user' })
  firstName: string;

  @Field(() => String, { description: 'lastName of the user' })
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;
}
