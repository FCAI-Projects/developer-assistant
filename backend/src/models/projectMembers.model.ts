import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectMemberDocument = ProjectMember & Document;

@Schema()
export class ProjectMember {
  @Prop()
  projectId: string;

  @Prop()
  userId: string;

  @Prop()
  role: string;

  @Prop()
  customId: string;

  @Prop()
  badges: string;
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
