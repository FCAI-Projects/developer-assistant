import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { createHmac }  from 'crypto';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => String,  { name: 'create_payment' })
  createPayment(@Args('createPaymentInput') createPaymentInput: CreatePaymentInput) {
    const paymentCon = paymentConfig[paymentConfig.mode];

    let order = {
      amount: createPaymentInput.amount,
      currency: "EGP",
      merchantOrderId: createPaymentInput.orderId,
      mid: paymentCon.mid,
      orderId: createPaymentInput.orderId,
      secret: paymentCon.iFrameSecret,
      baseUrl: paymentCon.baseUrl,
      hash: "",
    };
    // generate iframe hash
    order.hash = generateKashierOrderHash(order);
    order.secret = paymentCon.HPPSecret;
    
    // generate HPP hash
    let phash = generateKashierOrderHash(order);
    let callbackUrl = encodeURI("http://localhost:3030/" + "hppCallback");

    //Hosted payment page URL
    let hppUrl = `${paymentCon.baseUrl}/payment?mid=${order.mid}&orderId=${99}&amount=${22.00}&currency=${order.currency}&hash=${phash}&merchantRedirect=${callbackUrl}`;
    console.log(order);
    // return this.paymentService.create(createPaymentInput);
    return hppUrl;
  }

}

const paymentConfig = {
  mode: "live-test",
  // "live-live": {
  //   baseUrl: "https://iframe.kashier.io",
  //   iFrameSecret: process.env.iFrameSecret,
  //   HPPSecret: process.env.HPPSecret,
  //   mid: process.env.mid,
  // },
  "live-test": {
    baseUrl: "https://test-iframe.kashier.io",
    iFrameSecret: "13917bee-b3a7-4846-8cf9-a871d8530760",
    HPPSecret: "675a892d91c60645648dee051258da50$ca8fd6fef6b8a6ea7d5d42ab9cecf96b02f9578e66766f97a0505dbfd45196b417decf22147c3a83755edf9fc81f8da4",
    mid: "MID-7360-943",
  },
}

const  generateKashierOrderHash =  (order: any): string => {
  const mid = order.mid; //your merchant id
  const amount = 22.00; //eg: 22.00
  const currency = "EGP"; //eg: "EGP"
  const orderId = 99; //eg: 99
  const secret = order.secret;
  const path = `/?payment=${mid}.${orderId}.${amount}.${currency}`;
  
  const hash = createHmac('sha256', secret)
      .update(path)
      .digest('hex');
      
  return hash;
}