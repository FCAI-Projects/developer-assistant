import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaPlus } from "react-icons/fa";

// TODO: Use the right query to save to database

export const AddNewExpense: React.FC = () => {
  const [addProject, { loading, data, error }] = useMutation(LoginDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      amount: Yup.number().typeError("Only Numbers").required("Required"),
      date: Yup.string().required("Required"),
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
      <Button lightBlue className="flex items-center gap-2 px-3 py-2 text-xs" onClick={toggleModal}>
        <FaPlus /> Add Expense
      </Button>
      <Modal title="Add New Task" isOpen={isOpen} handleClose={toggleModal}>
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
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="text"
                id="amount"
                {...formik.getFieldProps("amount")}
                error={formik.touched.amount ? formik.errors.amount : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                {...formik.getFieldProps("date")}
                error={formik.touched.date ? formik.errors.date : ""}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" blue onClick={() => formik.handleSubmit()} loading={loading}>
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
