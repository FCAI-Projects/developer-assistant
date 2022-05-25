import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../../graphql/generated/graphql";
import { Input, Label, ToggleSwitch } from "../forms";
import { FaPlus, FaUserPlus } from "react-icons/fa";

// TODO: Use the right query to save to database

export const NewRoleModel: React.FC = () => {
  const [addProject, { loading, data, error }] = useMutation(LoginDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
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
              <ToggleSwitch id="createTask">Create Tasks</ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteTask">Delete Tasks</ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editTask">Edit Tasks</ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="assignTask">Assign Members to Tasks</ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="editProject">Edit Project</ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="inviteToProject">Invite To Project</ToggleSwitch>
            </div>
            <div className="w-full">
              <ToggleSwitch id="deleteMember">Delete Members</ToggleSwitch>
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