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

export const NewRoleModel: React.FC = () => {
  const ProjectId = useParams();
  const [isOpen, toggleModal] = useToggleModal();
  const [addRole, { loading }] = useMutation(CreateRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: ProjectId.id } }],
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      createTask: false,
      deleteTask: false,
      editTask: false,
      assignTask: false,
      editProject: false,
      inviteToProject: false,
      deleteMember: false,
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
        formikApi.resetForm({
          values: {
            name: "",
            createTask: false,
            deleteTask: false,
            editTask: false,
            assignTask: false,
            editProject: false,
            inviteToProject: false,
            deleteMember: false,
          },
        });
        toggleModal();
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
              <ToggleSwitch id="createTask" {...formik.getFieldProps("createTask")}>
                Create Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteTask" {...formik.getFieldProps("deleteTask")}>
                Delete Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editTask" {...formik.getFieldProps("editTask")}>
                Edit Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="assignTask" {...formik.getFieldProps("assignTask")}>
                Assign Members to Tasks
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editProject" {...formik.getFieldProps("editProject")}>
                Edit Project
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="inviteToProject" {...formik.getFieldProps("inviteToProject")}>
                Invite To Project
              </ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteMember" {...formik.getFieldProps("deleteMember")}>
                Delete Members
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
