import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { RolesDocument, UpdateRoleDocument } from "../../graphql/generated/graphql";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import { Input, Label, ToggleSwitch } from "../forms";
import { Modal } from "./Base";

interface UpdateRoleProps {
  id: string;
  name: string;
  createList: boolean;
  editList: boolean;
  deleteList: boolean;
  createTask: boolean;
  deleteTask: boolean;
  editTask: boolean;
  assignTask: boolean;
  unAssignTask: boolean;
  editDocs: boolean;
  canComment: boolean;
  editProject: boolean;
  manageRoles: boolean;
  manageExpenses: boolean;
  sendMails: boolean;
  managePayment: boolean;
  inviteMember: boolean;
  deleteMember: boolean;
  editMember: boolean;
}

export const UpdateRoleModel: React.FC<UpdateRoleProps> = ({
  id,
  name,
  createList,
  editList,
  deleteList,
  createTask,
  deleteTask,
  editTask,
  assignTask,
  unAssignTask,
  editDocs,
  canComment,
  editProject,
  manageRoles,
  manageExpenses,
  sendMails,
  managePayment,
  inviteMember,
  deleteMember,
  editMember,
}) => {
  const ProjectId = useParams();
  const [isOpen, toggleModal] = useToggleModal();
  const [updateRole, { loading }] = useMutation(UpdateRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: ProjectId.id } }],
  });
  const formik = useFormik({
    initialValues: {
      name: name,
      createList: createList,
      editList: editList,
      deleteList: deleteList,
      createTask: createTask,
      deleteTask: deleteTask,
      editTask: editTask,
      assignTask: assignTask,
      unAssignTask: unAssignTask,
      editDocs: editDocs,
      canComment: canComment,
      editProject: editProject,
      manageRoles: manageRoles,
      manageExpenses: manageExpenses,
      sendMails: sendMails,
      managePayment: managePayment,
      inviteMember: inviteMember,
      deleteMember: deleteMember,
      editMember: editMember,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        updateRole({
          variables: {
            updateRoleId: id,
            updateRoleInput: {
              name: values.name,
              project: ProjectId.id,
              createList: values.createList,
              editList: values.editList,
              deleteList: values.deleteList,
              createTask: values.createTask,
              deleteTask: values.deleteTask,
              editTask: values.editTask,
              assignTask: values.assignTask,
              unAssignTask: values.unAssignTask,
              editDocs: values.editDocs,
              canComment: values.canComment,
              editProject: values.editProject,
              manageRoles: values.manageRoles,
              manageExpenses: values.manageExpenses,
              sendMails: values.sendMails,
              managePayment: values.managePayment,
              inviteMember: values.inviteMember,
              deleteMember: values.deleteMember,
              editMember: values.editMember,
            },
          },
        });
        toggleModal();
        toast.success("Role Updated successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button lightYellow className="px-3 py-3 text-xs" onClick={toggleModal}>
        <FaEdit />
      </Button>
      <Modal title="Update Role" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="name">Role Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Role Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name ? formik.errors.name : ""}
              />
            </div>
            <h3>Permissions</h3>
            <div className="w-full">
              <ToggleSwitch id="createList" defaultChecked={createList} {...formik.getFieldProps("createList")}>
                Create List
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editList" defaultChecked={editList} {...formik.getFieldProps("editList")}>
                edit List
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteList" defaultChecked={deleteList} {...formik.getFieldProps("deleteList")}>
               Delete List
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="createTask" defaultChecked={createTask} {...formik.getFieldProps("createTask")}>
               Create Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteTask" defaultChecked={deleteTask} {...formik.getFieldProps("deleteTask")}>
                Delete Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editTask" defaultChecked={editTask} {...formik.getFieldProps("editTask")}>
                Edit Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="assignTask" defaultChecked={assignTask} {...formik.getFieldProps("assignTask")}>
                Assign Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="unAssignTask" defaultChecked={unAssignTask} {...formik.getFieldProps("unAssignTask")}>
                UnAssign Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editDocs" defaultChecked={editDocs} {...formik.getFieldProps("editDocs")}>
                Edit Docs
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="canComment" defaultChecked={canComment} {...formik.getFieldProps("canComment")}>
                Can Comment
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editProject" defaultChecked={editProject} {...formik.getFieldProps("editProject")}>
                Edit Project
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="manageRoles" defaultChecked={manageRoles} {...formik.getFieldProps("manageRoles")}>
                Manage Roles
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="manageExpenses" defaultChecked={manageExpenses} {...formik.getFieldProps("manageExpenses")}>
                Manage Expenses
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="sendMails" defaultChecked={sendMails} {...formik.getFieldProps("sendMails")}>
                Send Mails
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="managePayment" defaultChecked={managePayment} {...formik.getFieldProps("managePayment")}>
                Manage Payment
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="inviteMember" defaultChecked={inviteMember} {...formik.getFieldProps("inviteMember")}>
                Invite Member
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteMember" defaultChecked={deleteMember} {...formik.getFieldProps("deleteMember")}>
                Delete Member
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editMember" defaultChecked={editMember} {...formik.getFieldProps("editMember")}>
                Edit Member
              </ToggleSwitch>
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" green onClick={() => formik.handleSubmit()}>
            Update
          </Button>
          <Button type="submit" lightRed onClick={toggleModal} loading={loading}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
