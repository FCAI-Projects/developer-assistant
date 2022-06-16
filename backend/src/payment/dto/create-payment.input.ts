import { InputType, Int, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreatePaymentInput {
  @Prop({ required: true })
  @Field(() => Int)
  amount: number;

  @Prop({ required: true })
  @Field(() => String)
  project: String;

}
