import { Model } from "mongoose";
import Task, { TaskInterface } from "../../models/task.model";

export default class TaskService {
  private taskModel: Model<TaskInterface>;

  constructor() {
    this.taskModel = Task;
  }
}
