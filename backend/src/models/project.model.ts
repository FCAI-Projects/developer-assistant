import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  name: string;

  @Prop()
  clientEmail: string;

  @Prop()
  owner: string;

  @Prop()
  describtion: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
