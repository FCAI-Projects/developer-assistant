import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { Expense, ExpenseDocument } from './entities/expense.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseMode: Model<ExpenseDocument>,
  ) {}

  async create(
    createExpenseInput: CreateExpenseInput,
  ): Promise<ExpenseDocument> {
    const createdExpense = new this.expenseMode(createExpenseInput);
    return await createdExpense.save();
  }

  async findAll(project: string): Promise<ExpenseDocument[]> {
    return await this.expenseMode.find({ project });
  }

  async findOne(id: string): Promise<ExpenseDocument> {
    return await this.expenseMode.findById(id);
  }

  async update(
    id: string,
    updateExpenseInput: UpdateExpenseInput,
  ): Promise<ExpenseDocument> {
    return await this.expenseMode.findByIdAndUpdate(id, updateExpenseInput, {
      new: true,
    });
  }

  async remove(id: string): Promise<ExpenseDocument> {
    return await this.expenseMode.findByIdAndRemove(id);
  }
}
