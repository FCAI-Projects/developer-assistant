import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import {
  AssignMemberDocument,
  TaskDocument,
  useMembersByProjectQuery,
  useTaskQuery,
} from "../../graphql/generated/graphql";
import { CustomSelect, Label, Textarea } from "../forms";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface UpdateDocsProps {
  value: string | null | undefined;
  handleUpdateTask: (field: string, value: string) => void;
}

export const UpdateDocsModel: React.FC<UpdateDocsProps> = ({ value, handleUpdateTask }) => {
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      data: value,
    },
    validationSchema: Yup.object({
      data: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        if (!values.data) return toast.error("Please enter some data");
        handleUpdateTask("docs", values.data);
        toggleModal();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Button lightBlue className="px-2 py-2 text-xs text-blue-500" onClick={toggleModal}>
        <FaEdit />
      </Button>
      <Modal title="Assign Member" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="members">Member</Label>
              <Textarea id="data" placeholder="Enter data" {...formik.getFieldProps("data")} />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" green onClick={() => formik.handleSubmit()}>
            Save
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
