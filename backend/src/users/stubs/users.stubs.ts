import { ObjectId } from 'mongoose';
import { User } from '../entities/user.entity';

export const usersStub = (): User => {
  return {
    id: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    fname: 'eslam',
    lname: 'mohamed',
    email: 'emohamef7331@gmail.com',
    password: 'dksajk321ujkjdlsda',
    googleAppPassword: '62a1e8c94eb35edfc37ba122',
    githubToken: '62a1e8c94eb35edfc37ba122',
  };
};
