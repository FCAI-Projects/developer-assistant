import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

export type ExpenseDocument = Expense & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Expense {
  @Field(() => ID, { description: 'Expense ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'Expense Project' })
  project: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Expense Name' })
  name: string;

  @Prop({
    required: true,
  })
  @Field(() => Int, { description: 'Expense Amount' })
  amount: number;

  @Prop({
    required: true,
  })
  @Field(() => Date, { description: 'Expense Date' })
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
