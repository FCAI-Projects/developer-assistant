import { CreateTimeTrackingInput } from './create-time-tracking.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimeTrackingInput extends PartialType(
  CreateTimeTrackingInput,
) {
  @Field(() => Number)
  duration: number;
}
