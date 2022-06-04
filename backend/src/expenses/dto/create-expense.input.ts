import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExpenseInput {
  @Field(() => String, { description: 'Expense Project' })
  project: string;

  @Field(() => String, { description: 'Expense Name' })
  name: string;

  @Field(() => Int, { description: 'Expense Amount' })
  amount: number;

  @Field(() => Date, { description: 'Expense Date' })
  date: Date;
}
