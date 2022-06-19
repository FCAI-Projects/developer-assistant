import { Module } from '@nestjs/common';
import { PaymentcallbackService } from './paymentcallback.service';
import { PaymentcallbackController } from './paymentcallback.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [PaymentcallbackController],
  providers: [PaymentcallbackService]
})
export class PaymentcallbackModule {}
