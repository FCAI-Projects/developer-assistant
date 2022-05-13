import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input, Label } from "../components/forms";
import { CreateUserDocument } from "../generated/graphql";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaExclamationCircle } from "react-icons/fa";

// TODO: store the jwt token in local storage
// TODO: redirect to the app page

export const Register: React.FC = () => {
  const [addUser, { loading, data, error }] = useMutation(CreateUserDocument);
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      lname: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await handleRegiterNewUser(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleRegiterNewUser = async (values: any) => {
    await addUser({
      variables: {
        createUserInput: {
          ...values,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="flex justify-center pt-52">
      <form
        className="flex w-96 flex-col gap-4 rounded-lg border border-slate-300 p-8 shadow-sm"
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-center text-3xl font-medium">Register</h3>

        {error && (
          <p className="flex items-center gap-2 rounded-md bg-red-500 p-2 text-white">
            <FaExclamationCircle />
            {error.message}
          </p>
        )}
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
        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="***********"
            {...formik.getFieldProps("password")}
            error={formik.touched.password ? formik.errors.password : ""}
          />
        </div>
        <p>
          have an account?{" "}
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </p>
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
