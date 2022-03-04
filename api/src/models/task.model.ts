import mongoose, { Schema } from "mongoose";

interface AssignInterface extends mongoose.Document {
    userId: String;
    finished: boolean;
    finishedAt: Date;
    stage: number;
}

const AssignSchema = new Schema<AssignInterface>({
    userId: {
        type: String,
        require: true,
    },
    finished: {
        type: Boolean,
        require: true,
    },
    finishedAt: {
        type: Date,
        require: true,
    },
    stage: {
        type: Number,
        require: true,
    }
});

export interface TaskInterface extends mongoose.Document {
    name: string;
    description: string;
    docs: string;
    assign: AssignInterface[];
    attachments: [string];
    status: string; // enum
    periority: string; // enum
    tags: [string];
    startedAt: Date;
    deadliene: Date;
    finishedAt: Date;
}

const TaskSchema = new Schema<TaskInterface>({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    docs: {
        type: String,
    },
    assign: {
        type: [AssignSchema],
    },
    attachments: {
        type: [String]
    },
    status: {
        type: String,
        require: true,
        enum: ['ToDo', 'Doing', 'Done'],
    },
    periority: {
        type: String,
        require: true,
        enum: ['No Periority', 'Low', 'medium', 'High'],
    },
    tags: {
        type: [String]
    },
    startedAt: {
        type: Date,
        require: true,
    },
    deadliene: {
        type: Date,
        require: true,
    },
    finishedAt: {
        type: Date
    },
 
});

const Task = mongoose.model<TaskInterface>("Task", TaskSchema);
export default Task;
