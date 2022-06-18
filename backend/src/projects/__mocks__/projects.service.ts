import { projectStub } from "../stubs/projects.stub";

export const ProjectsService = jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue(projectStub()),
    findMyPorjects: jest.fn().mockResolvedValue([projectStub()]),
    findOne: jest.fn().mockResolvedValue(projectStub()),
    update: jest.fn().mockResolvedValue(projectStub()),
}));