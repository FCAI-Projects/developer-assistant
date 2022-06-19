import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreateProjectDocument, ProjectsDocument } from "../../graphql/generated/graphql";
import { Input, Label, ToggleSwitch } from "../forms";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export const NewProjectModal: React.FC = () => {
  const [addProject, { loading, data, error }] = useMutation(CreateProjectDocument, {
    refetchQueries: [{ query: ProjectsDocument }],
  });
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      name: "",
      clientEmail: "",
      description: "",
      github: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      clientEmail: Yup.string().email("Invalid email address").required("Required"),
      description: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        await addProject({
          variables: {
            createProjectInput: {
              name: values.name,
              clientEmail: values.clientEmail,
              description: values.description,
            },
            github: values.github,
          },
        });
        formikApi.resetForm({
          values: {
            name: "",
            clientEmail: "",
            description: "",
            github: false,
          },
        });
        toggleModal();
        toast.success("Project created successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button
        lightBlue
        className="flex items-center gap-2 px-3 py-2 text-xs"
        onClick={toggleModal}
        data-test="create-project"
      >
        <FaPlus /> Create Project
      </Button>
      <Modal title="Create New Project" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Project Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name ? formik.errors.name : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Client E-mail</Label>
              <Input
                type="email"
                id="clientEmail"
                placeholder="example@gmail.com"
                {...formik.getFieldProps("clientEmail")}
                error={formik.touched.clientEmail ? formik.errors.clientEmail : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                {...formik.getFieldProps("description")}
                error={formik.touched.description ? formik.errors.description : ""}
              />
            </div>
            <div className="w-full">
              <ToggleSwitch id="github" {...formik.getFieldProps("github")}>
                GitHub Repository
              </ToggleSwitch>
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
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
