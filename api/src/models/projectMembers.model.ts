import mongoose, { Schema } from "mongoose";

export interface ProjectMembersInterface extends mongoose.Document {
  projectId: string;
  userId: string;
  role: string;
  customId?: string;
  badges: string;
}

const ProjectMembersSchema = new Schema<ProjectMembersInterface>({
  projectId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  customId: {
    type: String,
    required: false,
  },
  badges: {
    type: String,
    required: true,
  },
});

const projectsRolse = mongoose.model<ProjectMembersInterface>("ProjectsMembers", ProjectMembersSchema);
export default projectsRolse;
