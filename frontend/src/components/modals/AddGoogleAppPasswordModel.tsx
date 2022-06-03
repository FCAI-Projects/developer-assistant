import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaKey, FaPlus } from "react-icons/fa";

// TODO: Use the right query to save to database

export const AddGoogleAppPasswordModel: React.FC = () => {
  const [addProject, { loading, data, error }] = useMutation(LoginDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
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
      <Button lightRed className="flex items-center gap-2" onClick={toggleModal}>
        <FaKey />
        Set Google App Password
      </Button>
      <Modal title="Set Google App Password" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="password">App Password</Label>
              <Input
                type="text"
                id="password"
                placeholder="App Password"
                {...formik.getFieldProps("password")}
                error={formik.touched.password ? formik.errors.password : ""}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button green type="submit" blue onClick={() => formik.handleSubmit()} loading={loading}>
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
