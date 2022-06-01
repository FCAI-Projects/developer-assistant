import React from "react";
import { Button } from "../../components/Button";
import { Input, Label } from "../../components/forms";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

import {  UpdateProjectDocument, useProjectQuery, useProjectsQuery } from "../../graphql/generated/graphql";
import { Formik, useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Project } from ".";


export const ProjectSettings: React.FC = () => {
  const ProjectID = useParams ()
  const [UpdateProject, { loading, error }] = useMutation(UpdateProjectDocument);
  const { data } = useProjectQuery({variables: {projectId: ProjectID.id as string}});

import { UpdateProjectDocument } from "../../graphql/generated/graphql";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ProjectSettings: React.FC = () => {
  const [updateProject, { loading, data, error }] = useMutation(UpdateProjectDocument);
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: data?.project.name,  
      clientEmail:data?.project.clientEmail , 
      description: data?.project.describtion,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      clientEmail: Yup.string().email("Invalid email address").required("Required"),
      description: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: async (Values) => {
      try {

        UpdateProject ({
          variables : {
              updateProjectId: ProjectID,
                  updateProjectInput: {
                        name: Values.name,
                        clientEmail: Values.clientEmail,
                        describtion : Values.description
                    }
            }
          })
            

        updateProject({
          variables: {
            updateProjectId: id,
            updateProjectInput: {
              name: values.name,
              clientEmail: values.clientEmail,
              describtion: values.description,
            },
          },
        });

        toast.success("Project updated successfully");

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

              {...formik.getFieldProps("name") }

              placeholder=""
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
        <Button type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
          Save Changes
        </Button>
      </div>
    </>
  );
};