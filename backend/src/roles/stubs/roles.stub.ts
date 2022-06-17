import { ObjectId } from 'mongoose';
import { Role } from '../entities/role.entity';

export const roleStub = (): Role => {
  return {
    id: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    project: '62ab3cc271449c781378ee24' as unknown as ObjectId,
    name: 'Role 1',
    createList: true,
    editList: true,
    deleteList: true,
    createTask: true,
    deleteTask: true,
    editTask: true,
    assignTask: true,
    unAssignTask: true,
    editDocs: true,
    canComment: true,
    editProject: true,
    manageRoles: true,
    manageExpenses: true,
    sendMails: true,
    managePayment: true,
    inviteMember: true,
    deleteMember: true,
    editMember: true,
  };
};
