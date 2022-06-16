import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import { Button } from "../components/Button";
import { Input, Label } from "../components/forms";
import { AddGitHubTokenModel } from "../components/modals/AddGitHubTokenModel";
import { AddGoogleAppPasswordModel } from "../components/modals/AddGoogleAppPasswordModel";
import { UpdatePassword } from "../components/modals/UpdatePasswordModal";
import { UpdateUserDocument, UserDocument, useUserQuery } from "../graphql/generated/graphql";
import { authState } from "../recoil";

export const Settings: React.FC = () => {
  const authToken = useRecoilValue(authState);
  const [id, setId] = useState("");
  const { data } = useUserQuery({ variables: { userId: id } });
  const [updateUser, { loading: updateLoading }] = useMutation(UpdateUserDocument, {
    refetchQueries: [{ query: UserDocument, variables: { userId: id } }],
  });

  const formik = useFormik({
    initialValues: {
      fname: data?.user?.fname,
      lname: data?.user?.lname,
      email: data?.user?.email,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fname: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      lname: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateUser({
          variables: {
            user: {
              fname: values.fname,
              lname: values.lname,
              email: values.email,
            },
          },
        });
        toast.success("Successfully updated user");
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (authToken) {
      const decode: any = decodeToken(authToken);
      setId(decode._id);
    }
  }, [authToken]);

  return (
    <div>
      <form className="mx-auto my-10 flex max-w-5xl flex-col gap-4" onSubmit={formik.handleSubmit}>
        <h3 className="text-center text-3xl font-medium">Settings</h3>
        <div className="flex gap-10">
          <div>
            <img
              className="h-60 w-60 rounded-full object-cover"
              src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="avatar"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="fname">First Name</Label>
              <Input
                type="text"
                id="fname"
                placeholder="John"
                {...formik.getFieldProps("fname")}
                error={formik.touched.fname ? formik.errors.fname : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                type="text"
                id="lname"
                placeholder="Doe"
                {...formik.getFieldProps("lname")}
                error={formik.touched.lname ? formik.errors.lname : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                {...formik.getFieldProps("email")}
                error={formik.touched.email ? formik.errors.email : ""}
              />
            </div>
            <div className="flex flex-row-reverse gap-5">
              <Button type="submit" loading={updateLoading}>
                Save Changes
              </Button>
              <UpdatePassword />
              <AddGoogleAppPasswordModel />
              <AddGitHubTokenModel />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
