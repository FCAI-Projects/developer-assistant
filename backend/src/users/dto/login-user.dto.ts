import {Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Users } from './users.dto';

@ObjectType()
export class LoginUser  extends PartialType(Users){
  @Field(() => String, { description: 'token of the user', nullable: true })
  token: string;
}
