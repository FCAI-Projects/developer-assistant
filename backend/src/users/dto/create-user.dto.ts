import { UserInput } from './user.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput extends PartialType(UserInput) {}
