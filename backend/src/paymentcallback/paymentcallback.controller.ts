import { Controller, Get, Req, Res, Render  } from '@nestjs/common';
import { Response } from 'express';
import { paymentConfig } from 'src/payment/payment.resolver';
import { PaymentcallbackService } from './paymentcallback.service';
import { createHmac } from 'crypto';
import { PaymentService } from 'src/payment/payment.service';
import { UpdatePaymentInput } from 'src/payment/dto/update-payment.input';

@Controller('paymentcallback')
export class PaymentcallbackController {
  constructor(private readonly paymentcallbackService: PaymentcallbackService, 
    private readonly paymentService: PaymentService
    ) {}
  
  @Get('/callback')
  async getPaymentcallback(@Req() req: any, @Res() res: Response) {
    const paymentCon = paymentConfig[paymentConfig.mode];
    if (req.query.signature) {
      // if (validateSignature(req.query, paymentCon.HPPSecret)) {
      // }
      
      const updatePaymentInput: UpdatePaymentInput = {
        paymentDate: new Date(),
        status: 'done'
      }
      await this.paymentService.update(req.query.merchantOrderId, updatePaymentInput);
      return res.render(
        'payment_completed',
        { },
      );
    }
  }
}

const validateSignature =  (query: any,secret: any): boolean => {
  let queryString = "";
  for (let key in query) {
      if (key == "signature" || key == "mode")
          continue;
      queryString = queryString + "&" + key + "=" + query[key];
  }
  let finalUrl = queryString.substr(1);
  const signature = createHmac('sha256', secret)
      .update(finalUrl)
      .digest('hex');

  if (signature == query.signature)
      return true;
  else
      return false;
}