import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreateProjectListsDocument, ProjectListsDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface SetStartTaskDateModelProps {
  deadline: string;
  handleUpdateTask: (field: string, value: string) => void;
}

export const SetStartTaskDateModel: React.FC<SetStartTaskDateModelProps> = ({ handleUpdateTask, deadline }) => {
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      date: deadline?.slice(0, 19),
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        handleUpdateTask("startedAt", values.date);
        toggleModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button light onClick={toggleModal}>
        Set/Update Start Date
      </Button>
      <Modal title=" Set/Update Deadline" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="date">Date</Label>
              <Input
                type="datetime-local"
                id="date"
                {...formik.getFieldProps("date")}
                error={formik.touched.date ? formik.errors.date : ""}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" onClick={() => formik.handleSubmit()}>
            Set Start Date
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
