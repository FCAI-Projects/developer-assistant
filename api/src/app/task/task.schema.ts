import { Field, ObjectType, InputType } from "type-graphql";

enum Status {
    TODO = "ToDo",
    DOING = "Doing",
    DONE = "Done"
}

enum Periority {
    NO_PERIORITY = "No Periority",
    LOW = "Low",
    MEDIUM = "medium",
    HIGH = "High"
}

class Assgin {
    @Field()
    userId: string;

    @Field()
    finished: boolean;

    @Field()
    finishedAt: Date;

    @Field()
    stage: number;
}

@ObjectType()
export class Task {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    docs: string;

    @Field()
    assign: Assgin;

    @Field()
    attachments: string[];

    @Field()
    status: Status;

    @Field()
    Periority: Periority;

    @Field()
    tags: string[];

    @Field()
    startedAt: Date;

    @Field()
    deadliene: Date;

    @Field()
    finishedAt: Date;
}

@InputType()
export class TaskInput implements Partial<Task> {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    status: Status;

    @Field()
    Periority: Periority;

    @Field()
    startedAt: Date;

    @Field()
    deadliene: Date;
}