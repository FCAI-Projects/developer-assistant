import { Test, TestingModule } from '@nestjs/testing';
import { PaymentcallbackController } from './paymentcallback.controller';
import { PaymentcallbackService } from './paymentcallback.service';

describe('PaymentcallbackController', () => {
  let controller: PaymentcallbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentcallbackController],
      providers: [PaymentcallbackService],
    }).compile();

    controller = module.get<PaymentcallbackController>(PaymentcallbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
