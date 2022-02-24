import mongoose, { Schema } from "mongoose";
type expenses =  {
  name: String;
  expense: number;
}
export interface ProjectInterface extends mongoose.Document {
  Pname: string;
  Powner: string;
  Pbudget: number;
  ClientEmail: string;
  Pdescribtion?: string;
  pexpenses: [expenses];

}


const ProjectSchema = new Schema<ProjectInterface>({
  Pname: {
    type: String,
    require: true,
  },

  ClientEmail: {
    type: String,
    require: true,
  },
  Powner: {
    type: String,
    require: true,
  },
  Pdescribtion: {
    type: String,
    require: true,
  },
  
});

const Project = mongoose.model<ProjectInterface>("Project", ProjectSchema);
export default Project;
