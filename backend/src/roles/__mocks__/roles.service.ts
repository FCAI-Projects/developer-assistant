import { roleStub } from "../stubs/roles.stub";


export const RolesService = jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue(roleStub()),
    findAll: jest.fn().mockResolvedValue([roleStub()]),
    findOne: jest.fn().mockResolvedValue(roleStub()),
    update: jest.fn().mockResolvedValue(roleStub()),
    remove: jest.fn().mockResolvedValue(roleStub()),
}));