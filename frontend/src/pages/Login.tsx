import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input, Label } from "../components/forms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { FaExclamationCircle } from "react-icons/fa";
import { LoginDocument } from "../graphql/generated/graphql";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil";

export const Login: React.FC = () => {
  const [loginUser, { loading, data, error }] = useMutation(LoginDocument);
  const setToken = useSetRecoilState(authState);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await handleLoginUser(values);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleLoginUser = async (values: any) => {
    await loginUser({
      variables: {
        ...values,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setToken(data.login.token);
      localStorage.setItem("token", data.login.token);
      console.log(data);
      localStorage.setItem("id", data.login.userId);
    }
  }, [data]);

  return (
    <div className="flex justify-center pt-52">
      <form
        className="flex w-96 flex-col gap-4 rounded-lg border border-slate-300 p-8 shadow-sm"
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-center text-3xl font-medium">Login</h3>

        {error && (
          <p className="flex items-center gap-2 rounded-md bg-red-500 p-2 text-white">
            <FaExclamationCircle />
            {error.message}
          </p>
        )}
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
          Don't have an account?{" "}
          <Link className="text-blue-600 underline" to="/register">
            Register
          </Link>
        </p>
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
