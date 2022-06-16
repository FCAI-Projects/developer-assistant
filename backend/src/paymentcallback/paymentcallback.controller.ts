import { Controller, Get } from '@nestjs/common';
import { PaymentcallbackService } from './paymentcallback.service';

@Controller('paymentcallback')
export class PaymentcallbackController {
  constructor(private readonly paymentcallbackService: PaymentcallbackService) {}
  
  @Get('/attachemnts/:name')
  async getPaymentcallback() {

  }
}
