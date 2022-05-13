import React from "react";
import { Button } from "../../components/Button";
import { Input, Label } from "../../components/forms";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../../graphql/generated/graphql";
import { useFormik } from "formik";

export const ProjectSettings: React.FC = () => {
  const [editProject, { loading, data, error }] = useMutation(LoginDocument);
  const formik = useFormik({
    initialValues: {
      name: "Project Name",
      clientEmail: "example@domain.com",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      clientEmail: Yup.string().email("Invalid email address").required("Required"),
      description: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
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
      <div>
        <form className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Project Settings</h2>
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
        </form>
      </div>
      <div className="mt-5 flex flex-row-reverse gap-3">
        <Button type="submit" blue onClick={() => formik.handleSubmit()} loading={loading}>
          Save Changes
        </Button>
      </div>
    </>
  );
};
