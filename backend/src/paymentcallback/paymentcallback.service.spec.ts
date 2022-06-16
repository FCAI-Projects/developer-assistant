import { Test, TestingModule } from '@nestjs/testing';
import { PaymentcallbackService } from './paymentcallback.service';

describe('PaymentcallbackService', () => {
  let service: PaymentcallbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentcallbackService],
    }).compile();

    service = module.get<PaymentcallbackService>(PaymentcallbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
