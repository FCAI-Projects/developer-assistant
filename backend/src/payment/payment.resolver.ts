import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment, PaymentDocument } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { createHmac } from 'crypto';
import { CreatePaymentUrlInput } from './dto/create-payment-url';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => [Payment], { name: 'findPayments' })
  @UseGuards(JwtAuthGuard)
  async findPayments(
    @Args('project') project: string,
  ): Promise<PaymentDocument[]> {
    return await this.paymentService.findAll(project);
  }

  @Mutation(() => Payment, { name: 'createPayment' })
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    const paymentDB = await this.paymentService.create(createPaymentInput);

    const paymentCon = paymentConfig[paymentConfig.mode];

    let order = {
      amount: createPaymentInput.amount,
      currency: 'EGP',
      merchantOrderId: paymentDB.id,
      mid: paymentCon.mid,
      orderId: paymentDB.id,
      secret: paymentCon.iFrameSecret,
      baseUrl: paymentCon.baseUrl,
      hash: '',
    };
    // generate iframe hash
    order.hash = generateKashierOrderHash(order);
    order.secret = paymentCon.HPPSecret;

    let callbackUrl = encodeURI(
      'https://assistant.impulses-corp.com/' + 'paymentcallback/callback',
    );

    //Hosted payment page URL
    let paymentUrl = `${paymentCon.baseUrl}/payment?mid=${order.mid}&orderId=${order.merchantOrderId}&amount=${order.amount}&currency=${order.currency}&hash=${order.hash}&merchantRedirect=${callbackUrl}`;

    const updatePaymentInput: UpdatePaymentInput = {
      paymentUrl: paymentUrl,
    };

    const updateRes = await this.paymentService.update(
      paymentDB.id,
      updatePaymentInput,
    );
    return {
      id: paymentDB.id,
      ...updateRes,
      paymentUrl: paymentUrl,
    };
  }
}

export const paymentConfig = {
  mode: 'live-test',
  // "live-live": {
  //   baseUrl: "https://iframe.kashier.io",
  //   iFrameSecret: process.env.iFrameSecret,
  //   HPPSecret: process.env.HPPSecret,
  //   mid: process.env.mid,
  // },
  'live-test': {
    baseUrl: 'https://test-iframe.kashier.io',
    iFrameSecret: 'cc4de943-3c29-403b-821a-3fe7a7f9ae3d',
    HPPSecret:
      '47aa477eb1b7ac0a292f648c7e364ac8$78b62a60c5644cb12b25b700e4a80725212ed0c8a091a2694b2c106b600d2af260d060f0ce5ec4ab2987fa9f71ae563d',
    mid: 'MID-7198-380',
  },
};

const generateKashierOrderHash = (order: any): string => {
  const mid = order.mid; //your merchant id
  const amount = order.amount; //eg: 22.00
  const currency = 'EGP'; //eg: "EGP"
  const orderId = order.orderId; //eg: 99
  const secret = order.secret;
  const path = `/?payment=${mid}.${orderId}.${amount}.${currency}`;

  const hash = createHmac('sha256', secret).update(path).digest('hex');

  return hash;
};
