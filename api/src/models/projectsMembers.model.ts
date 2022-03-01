import mongoose, { Schema } from "mongoose";

export interface ProjectsMembersInterface extends mongoose.Document {
    projectId: string;
    userId: string;
    role: string;
    customId?: string;
    badges: string;
}

const ProjectsMembersSchema = new Schema<ProjectsMembersInterface> ({
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

const projectsRolse = mongoose.model<ProjectsMembersInterface>("ProjectsMembers", ProjectsMembersSchema);
export default projectsRolse;