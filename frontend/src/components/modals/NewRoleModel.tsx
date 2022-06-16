import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreateRoleDocument, RolesDocument } from "../../graphql/generated/graphql";
import { Input, Label, ToggleSwitch } from "../forms";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const NewRoleModel: React.FC = () => {
  const ProjectId = useParams();
  const [isOpen, toggleModal] = useToggleModal();
  const [addRole, { loading }] = useMutation(CreateRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: ProjectId.id } }],
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      createList: false,
      editList: false,
      deleteList: false,
      createTask: false,
      deleteTask: false,
      editTask: false,
      assignTask: false,
      unAssignTask: false,
      editDocs: false,
      canComment: false,
      editProject: false,
      manageRoles: false,
      manageExpenses: false,
      sendMails: false,
      managePayment: false,
      inviteMember: false,
      deleteMember: false,
      editMember: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        addRole({
          variables: {
            createRoleInput: {
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
        formikApi.resetForm({
          values: {
            name: "",
            createList: false,
            editList: false,
            deleteList: false,
            createTask: false,
            deleteTask: false,
            editTask: false,
            assignTask: false,
            unAssignTask: false,
            editDocs: false,
            canComment: false,
            editProject: false,
            manageRoles: false,
            manageExpenses: false,
            sendMails: false,
            managePayment: false,
            inviteMember: false,
            deleteMember: false,
            editMember: false,
          },
        });
        toggleModal();
        toast.success("Role created successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button lightBlue className="flex items-center gap-2 px-3 py-2 text-xs" onClick={toggleModal}>
        <FaPlus /> Create New
      </Button>
      <Modal title="Create New Role" isOpen={isOpen} handleClose={toggleModal}>
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
              <ToggleSwitch id="createList" {...formik.getFieldProps("createList")}>
                Create List
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editList" {...formik.getFieldProps("editList")}>
                edit List
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteList" {...formik.getFieldProps("deleteList")}>
               Delete List
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="createTask" {...formik.getFieldProps("createTask")}>
               Create Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteTask" {...formik.getFieldProps("deleteTask")}>
                Delete Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editTask" {...formik.getFieldProps("editTask")}>
                Edit Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="assignTask" {...formik.getFieldProps("assignTask")}>
                Assign Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="unAssignTask" {...formik.getFieldProps("unAssignTask")}>
                UnAssign Task
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editDocs" {...formik.getFieldProps("editDocs")}>
                Edit Docs
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="canComment" {...formik.getFieldProps("canComment")}>
                Can Comment
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editProject" {...formik.getFieldProps("editProject")}>
                Edit Project
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="manageRoles" {...formik.getFieldProps("manageRoles")}>
                Manage Roles
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="manageExpenses" {...formik.getFieldProps("manageExpenses")}>
                Manage Expenses
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="sendMails" {...formik.getFieldProps("sendMails")}>
                Send Mails
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="managePayment" {...formik.getFieldProps("managePayment")}>
                Manage Payment
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="inviteMember" {...formik.getFieldProps("inviteMember")}>
                Invite Member
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteMember" {...formik.getFieldProps("deleteMember")}>
                Delete Member
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editMember" {...formik.getFieldProps("editMember")}>
                Edit Member
              </ToggleSwitch>
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" green onClick={() => formik.handleSubmit()} loading={loading}>
            Create
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
