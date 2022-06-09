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
  createTask: boolean;
  deleteTask: boolean;
  editTask: boolean;
  assignTask: boolean;
  editProject: boolean;
  inviteToProject: boolean;
  deleteMember: boolean;
}

export const UpdateRoleModel: React.FC<UpdateRoleProps> = ({
  id,
  name,
  createTask,
  deleteTask,
  editTask,
  assignTask,
  editProject,
  inviteToProject,
  deleteMember,
}) => {
  const ProjectId = useParams();
  const [isOpen, toggleModal] = useToggleModal();
  const [updateRole, { loading }] = useMutation(UpdateRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: ProjectId.id } }],
  });
  const formik = useFormik({
    initialValues: {
      name: name,
      createTask: createTask,
      deleteTask: deleteTask,
      editTask: editTask,
      assignTask: assignTask,
      editProject: editProject,
      inviteToProject: inviteToProject,
      deleteMember: deleteMember,
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
              createTask: values.createTask,
              deleteTask: values.deleteTask,
              editTask: values.editTask,
              assignTask: values.assignTask,
              editProject: values.editProject,
              inviteToProject: values.inviteToProject,
              deleteMember: values.deleteMember,
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
              <ToggleSwitch id="createTask" defaultChecked={createTask} {...formik.getFieldProps("createTask")}>
                Create Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteTask" defaultChecked={deleteTask} {...formik.getFieldProps("deleteTask")}>
                Delete Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editTask" defaultChecked={editTask} {...formik.getFieldProps("editTask")}>
                Edit Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="assignTask" defaultChecked={assignTask} {...formik.getFieldProps("assignTask")}>
                Assign Members to Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editProject" defaultChecked={editProject} {...formik.getFieldProps("editProject")}>
                Edit Project
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch
                id="inviteToProject"
                defaultChecked={inviteToProject}
                {...formik.getFieldProps("inviteToProject")}
              >
                Invite To Project
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteMember" defaultChecked={deleteMember} {...formik.getFieldProps("deleteMember")}>
                Delete Members
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
