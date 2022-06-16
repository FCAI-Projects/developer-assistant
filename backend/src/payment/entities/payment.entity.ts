import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/projects/entities/project.entity';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Payment {
  @Field(() => ID, { description: 'Payment ID' })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  @Field(() => Project, { description: 'payment Project ID' })
  project: MongooseSchema.Types.ObjectId;
  
  @Prop({ required: true, type:String})
  @Field(() => String, { description: 'payment url' })
  paymentUrl: string;

  @Prop({ required: true})
  @Field(() => Int, { description: 'payment amount' })
  amount: number;

  @Prop({ default: 'pending', type:String, enum: ['pending', 'done', 'failed']})
  @Field(() => String, { description: 'payment status' })
  status?: string;

  @Prop({ default: "",  type: Date})
  @Field(() => Date, { description: 'payment date done', nullable: true })
  paymentDate?: Date;

  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date

  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);