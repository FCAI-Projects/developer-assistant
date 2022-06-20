import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreateProjectListsDocument, ProjectListsDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const NewListModel: React.FC = () => {
  const projectId = useParams().id;
  const [createList, { loading }] = useMutation(CreateProjectListsDocument, {
    refetchQueries: [{ query: ProjectListsDocument, variables: { project: projectId } }],
  });
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#ffffff",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      color: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        createList({
          variables: {
            createProjectListsInput: {
              project: projectId,
              name: values.name,
              color: values.color,
              tasks: [],
            },
          },
        });
        formikApi.resetForm({
          values: {
            name: "",
            color: "",
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
        <FaPlus /> Add List
      </Button>
      <Modal title="Add New List" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Task Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name ? formik.errors.name : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="color">Color</Label>
              <Input
                type="color"
                id="color"
                {...formik.getFieldProps("color")}
                error={formik.touched.color ? formik.errors.color : ""}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
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
