import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
