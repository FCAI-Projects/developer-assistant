import { boolean } from "joi";
import mongoose, { Schema } from "mongoose";

export interface CustomRolesInterface extends mongoose.Document {
    name: string;
    projectId: string;
    createTask?: boolean;
    deleteTask?: boolean;
    editTask?: boolean;
    assignTask?: boolean;
    editProject?: boolean;
    inviteToProject?: boolean;
    deleteMember?: boolean;
}

const CustomRolesSchema = new Schema<CustomRolesInterface>({
    name: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    createTask: {
        type: Boolean,
        default: false,
    },
    deleteTask: {
        type: Boolean,
        default: false,
    },
    editTask: {
        type: Boolean,
        default: false,
    },
    assignTask: {
        type: Boolean,
        default: false,
    },
    editProject: {
        type: Boolean,
        default: false,
    },
    inviteToProject: {
        type: Boolean,
        default: false,
    },
    deleteMember: {
        type: Boolean,
        default: false,
    },
});

const CustomRolse = mongoose.model<CustomRolesInterface>("CustomRolse", CustomRolesSchema);
export default CustomRolse;