import { projectStub } from "../stubs/user.stub";

export const ProjectsService = jest.fn().mockReturnValue(() => ({
    create: jest.fn().mockResolvedValue(projectStub()),
    findMyPorjects: jest.fn().mockResolvedValue([projectStub()]),
    findOne: jest.fn().mockResolvedValue(projectStub()),
    update: jest.fn().mockResolvedValue(projectStub()),
}));