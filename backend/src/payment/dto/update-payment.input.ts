import { CreatePaymentInput } from './create-payment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {

  @Field(() => String, { description: 'payment status' })
  status?: string;

  @Field(() => String, { description: 'payment url' , nullable:true})
  paymentUrl?: string;

  @Field(() => Date, { description: 'payment date done', nullable: true })
  paymentDate?: Date;
}
