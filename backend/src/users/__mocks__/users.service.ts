import { usersStub } from "../stubs/users.stubs";

export const UsersService = jest.fn().mockImplementation(() => ({
    createUser: jest.fn().mockResolvedValue(usersStub()),
    findAll: jest.fn().mockResolvedValue([usersStub()]),
    findUserByEmail: jest.fn().mockResolvedValue(usersStub()),
    findOne: jest.fn().mockResolvedValue(usersStub()),
    deleteOne: jest.fn().mockResolvedValue(usersStub()),
    updateOne: jest.fn().mockResolvedValue(usersStub())
}));