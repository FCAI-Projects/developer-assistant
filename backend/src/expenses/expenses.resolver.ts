import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';

@Resolver(() => Expense)
export class ExpensesResolver {
  constructor(private readonly expensesService: ExpensesService) {}

  @Mutation(() => Expense)
  createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
  ) {
    return this.expensesService.create(createExpenseInput);
  }

  @Query(() => [Expense], { name: 'expenses' })
  findAll(@Args('project', { type: () => String }) project: string) {
    return this.expensesService.findAll(project);
  }

  @Query(() => Expense, { name: 'expense' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.expensesService.findOne(id);
  }

  @Mutation(() => Expense)
  updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput,
  ) {
    return this.expensesService.update(
      updateExpenseInput.id,
      updateExpenseInput,
    );
  }

  @Mutation(() => Expense)
  removeExpense(@Args('id', { type: () => String }) id: string) {
    return this.expensesService.remove(id);
  }
}
