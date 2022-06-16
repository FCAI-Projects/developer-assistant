import { Module } from '@nestjs/common';
import { PaymentcallbackService } from './paymentcallback.service';
import { PaymentcallbackController } from './paymentcallback.controller';

@Module({
  controllers: [PaymentcallbackController],
  providers: [PaymentcallbackService]
})
export class PaymentcallbackModule {}
