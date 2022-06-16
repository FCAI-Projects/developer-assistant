import { InputType, Int, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreatePaymentUrlInput {
  @Prop({ required: true })
  @Field(() => Int)
  amount: number;

  @Prop({ required: true })
  @Field(() => String)
  projectId: String;

  @Prop({ required: true })
  @Field(() => String)
  paymentUrl: String;

}
