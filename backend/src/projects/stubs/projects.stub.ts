import { Project } from '../entities/project.entity';
import { ObjectId } from 'mongoose';

export const projectStub = (): Project => {
  return {
    id: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    name: 'Project 1',
    description: 'Project 1 description',
    clientEmail: 'emohamef733@gmail.com',
    budget: 100,
    owner: '62a1e8c94eb35edfc37ba122' as unknown as ObjectId,
    gihubRepo : undefined,
  };
};
