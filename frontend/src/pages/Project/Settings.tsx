import React from "react";
import { Button } from "../../components/Button";
import { Input, Label } from "../../components/forms";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Project } from ".";
import { UpdateProjectDocument, useProjectByIdQuery } from "../../graphql/generated/graphql";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { FaKey, FaTrash } from "react-icons/fa";
import { AddGoogleAppPasswordModel } from "../../components/modals/AddGoogleAppPasswordModel";

export const ProjectSettings: React.FC = () => {
  const [updateProject, { loading, data, error }] = useMutation(UpdateProjectDocument);
  const { id } = useParams();
  const { data: project, loading: projectLoading } = useProjectByIdQuery({
    variables: { projectId: id as string },
  });

  const formik = useFormik({
    initialValues: {
      name: project?.project.name,
      clientEmail: project?.project.clientEmail,
      description: project?.project.description,
      budget: project?.project.budget,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      clientEmail: Yup.string().email("Invalid email address").required("Required"),
      description: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
      budget: Yup.number().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateProject({
          variables: {
            updateProjectId: id,
            updateProjectInput: {
              name: values.name,
              clientEmail: values.clientEmail,
              description: values.description,
              budget: values.budget,
            },
          },
        });

        toast.success("Project updated successfully");
      } catch (error) {
        console.log(error);
        toast.error("An error occured");
      }
    },
  });

  if (projectLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div>
        <form className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Project Settings</h2>
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              error={formik.touched.name ? formik.errors.name : ""}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Client E-mail</Label>
            <Input
              type="email"
              id="clientEmail"
              {...formik.getFieldProps("clientEmail")}
              error={formik.touched.clientEmail ? formik.errors.clientEmail : ""}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="budget">Budget</Label>
            <Input
              type="number"
              id="budget"
              {...formik.getFieldProps("budget")}
              error={formik.touched.budget ? formik.errors.budget : ""}
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
        </form>
      </div>
      <div className="mt-5 flex flex-row-reverse gap-3">
        <Button green type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
          Save Changes
        </Button>
        <Button lightRed className="flex items-center gap-2">
          <FaTrash /> Delete Project
        </Button>
      </div>
    </>
  );
};
