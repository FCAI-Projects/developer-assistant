import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UserInput {
  @Field(() => MongooseSchema.Types.ObjectId, { description: 'id of the user' })
  _id: MongooseSchema.Types.ObjectId

  @Field(() => String, { description: 'firstName of the user' })
  firstName: string;

  @Field(() => String, { description: 'lastName of the user'})
  lastName: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;


}
