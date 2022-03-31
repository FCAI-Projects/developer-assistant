import { UserInput } from './user.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => MongooseSchema.Types.ObjectId)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'firstName of the user', nullable: true })
  firstName: string;

  @Field(() => String, { description: 'lastName of the user', nullable: true  })
  lastName: string;

  @Field(() => String, { description: 'email of the user', nullable: true  })
  email: string;

  @Field(() => String, { description: 'password of the user', nullable: true  })
  password: string;
}
