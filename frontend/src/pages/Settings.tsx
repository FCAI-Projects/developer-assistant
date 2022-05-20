import { useFormik } from "formik";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import * as Yup from "yup";
import { Button } from "../components/Button";
import { Input, Label } from "../components/forms";
import { UpdatePassword } from "../components/modals/UpdatePasswordModal";

export const Settings: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fname: "Ezzdin",
      lname: "Atef",
      email: "ezzdinatef@gmail.com",
    },
    validationSchema: Yup.object({
      fname: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      lname: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
      } catch (error) {
        console.log(error);
      }
    },
  });

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
              <Button type="submit">Save Changes</Button>
              <UpdatePassword />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
