import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Payment, PaymentDocument } from './entities/payment.entity';
import { Model } from 'mongoose';
import { CreatePaymentUrlInput } from './dto/create-payment-url';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymnetModel: Model<PaymentDocument>,
  ) {}

  create(createPaymentInput: CreatePaymentUrlInput) {
    const payment = new this.paymnetModel(createPaymentInput);
    return payment.save();
  }

  findOne(projectId: string) {
    return this.paymnetModel.findOne({projectId});
  }
}