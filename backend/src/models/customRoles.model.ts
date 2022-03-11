import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomRoleDocument = CustomRole & Document;

@Schema()
export class CustomRole {
  @Prop()
  name: string;

  @Prop()
  projectId: string;

  @Prop({ default: false })
  createTask: boolean;

  @Prop({ default: false })
  deleteTask: boolean;

  @Prop({ default: false })
  editTask: boolean;

  @Prop({ default: false })
  assignTask: boolean;

  @Prop({ default: false })
  editProject: boolean;

  @Prop({ default: false })
  inviteToProject: boolean;

  @Prop({ default: false })
  deleteMember: boolean;
}

export const CustomRoleSchema = SchemaFactory.createForClass(CustomRole);
