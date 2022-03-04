import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Task } from "./task.schema";
import TaskService from "./task.service";

@Resolver((of) => Task)
export class TaskResolver {
    private userService: TaskService;

    constructor() {
      this.userService = new TaskService();
    }
}