import { atom } from "recoil";

interface Props {
  admin?: boolean;
  createList?: boolean;
  editList?: boolean;
  deleteList?: boolean;
  createTask?: boolean;
  deleteTask?: boolean;
  editTask?: boolean;
  assignTask?: boolean;
  unAssignTask?: boolean;
  editDocs?: boolean;
  canComment?: boolean;
  editProject?: boolean;
  manageRoles?: boolean;
  manageExpenses?: boolean;
  sendMails?: boolean;
  managePayment?: boolean;
  inviteMember?: boolean;
  deleteMember?: boolean;
  editMember?: boolean;
}

export const roleState = atom<Props>({
  key: "role",
  default: {},
});
