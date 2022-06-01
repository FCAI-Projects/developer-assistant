import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../../graphql/generated/graphql";
import { CustomSelect, Input, Label, Multiselect } from "../forms";
import { FaPlus } from "react-icons/fa";

// TODO: Use the right query to save to database

interface formikProps {
  name: string;
  project: { id: string; name: string };
  members: { id: string; name: string }[] | [];
}

export const NewGroupModel: React.FC = () => {
  const [addProject, { loading, data, error }] = useMutation(LoginDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik<formikProps>({
    initialValues: {
      name: "",
      project: { id: "1", name: "project 1" },
      members: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      project: Yup.string().required("Required"),
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
      <button
        className="mx-auto mt-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-white"
        onClick={toggleModal}
      >
        <FaPlus />
      </button>
      <Modal title="Create New Group" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Group Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name ? formik.errors.name : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="project">Project</Label>
              <CustomSelect
                options={[
                  { id: "1", name: "project 1" },
                  { id: "2", name: "project 1" },
                  { id: "3", name: "project 1" },
                  { id: "4", name: "project 1" },
                ]}
                value={formik.values.project}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue("project", e);
                }}
                label="name"
                id="id"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="members">Members</Label>
              <Multiselect
                options={[
                  { id: "1", name: "member 1" },
                  { id: "2", name: "member 1" },
                  { id: "3", name: "member 1" },
                  { id: "4", name: "member 1" },
                ]}
                value={formik.values.members}
                onChange={(e) => {
                  formik.setFieldValue("members", e);
                }}
                label="name"
                id="id"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" blue onClick={() => formik.handleSubmit()} loading={loading}>
            Add
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
