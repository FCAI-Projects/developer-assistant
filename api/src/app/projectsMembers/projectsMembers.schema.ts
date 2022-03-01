import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class ProjectsMembers {
    @Field()
    _id: string;

    @Field()
    projectId: string;

    @Field()
    userId: string;

    @Field()
    role: string;

    @Field()
    customId: string;

    @Field()
    badges: string;
}

@InputType()
export class ProjectsMembersInput implements Partial<ProjectsMembers> {
    @Field()
    projectId: string;

    @Field()
    userId: string;

    @Field()
    role: string;

    @Field()
    customId: string;

    @Field()
    badges: string;
}