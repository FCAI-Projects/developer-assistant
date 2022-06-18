import { Module } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTrackingResolver } from './time-tracking.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TimeTracking,
  TimeTrackingSchema,
} from './entities/time-tracking.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeTracking.name, schema: TimeTrackingSchema },
    ]),
  ],
  providers: [TimeTrackingResolver, TimeTrackingService],
  exports: [TimeTrackingService],
})
export class TimeTrackingModule {}
