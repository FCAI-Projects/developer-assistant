import { ObjectId } from 'mongoose';
import { Task } from '../entities/task.entity';

export const tasksStub = (): Task => {
  return {
    id: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    project: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    name: 'Task 1',
    description: 'Task 1 description',
    assign: [],
    attachments: [],
    status: 'todo',
    periority: 'medium',
    tags: [],
    startedAt: new Date('2022-06-17T15:06:21.365Z'),
    finishedAt: new Date('2022-06-17T15:06:21.365Z'),
    deadline: new Date('2022-06-17T15:06:21.365Z'),
    docs: '',
  };
};
