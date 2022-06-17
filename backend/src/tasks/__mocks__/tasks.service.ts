import { tasksStub } from "../stubs/tasks.stub";


export const TasksService = jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue(tasksStub()),
    findAll: jest.fn().mockResolvedValue([tasksStub()]),
    findByUser: jest.fn().mockResolvedValue([tasksStub()]),
    findOne: jest.fn().mockResolvedValue(tasksStub()),
    filter: jest.fn().mockResolvedValue([tasksStub()]),
    remove: jest.fn().mockResolvedValue(tasksStub()),
    updateModel: jest.fn().mockResolvedValue(tasksStub()),
    RemoveAssignMember: jest.fn().mockResolvedValue(tasksStub()),
    update: jest.fn().mockResolvedValue(tasksStub()),
}));