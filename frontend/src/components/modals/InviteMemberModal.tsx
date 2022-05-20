import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../../graphql/generated/graphql";
import { CustomSelect, Input, Label } from "../forms";
import { FaPlus, FaUserPlus } from "react-icons/fa";

// TODO: Use the right query to save to database

export const InviteMemberModal: React.FC = () => {
  const [addProject, { loading, data, error }] = useMutation(LoginDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      member: "",
      role: "",
    },
    validationSchema: Yup.object({
      member: Yup.string().email().required("Required"),
      role: Yup.string().required("Required"),
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
        <FaUserPlus /> Invite Member
      </Button>
      <Modal title="Create New Project" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="member">Member Email</Label>
              <Input id="member" type="email" placeholder="Member Email" {...formik.getFieldProps("member")} />
            </div>
            <div className="w-full">
              <Label htmlFor="role">Role</Label>
              <CustomSelect
                options={[
                  { id: "1", name: "Member" },
                  { id: "2", name: "Admin" },
                  { id: "3", name: "Editor" },
                  { id: "4", name: "Custom Role" },
                ]}
                value={{ id: "1", name: "Member" }}
                onChange={(e) => {
                  console.log(e);
                }}
                label="name"
                id="id"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" green onClick={() => formik.handleSubmit()} loading={loading}>
            Invite
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
