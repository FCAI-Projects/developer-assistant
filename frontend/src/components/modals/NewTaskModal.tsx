import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreateTaskDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface NewTaskModalProps {
  listId: string;
  refetchTasks: () => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ listId, refetchTasks }) => {
  const projectId = useParams();
  const [addTask, { loading, data, error }] = useMutation(CreateTaskDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        addTask({
          variables: {
            createTaskInput: {
              list: listId,
              name: values.name,
              description: values.description,
              project: projectId.id,
            },
          },
        });
        toggleModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      refetchTasks();
    }
  }, [data]);

  return (
    <>
      <button
        className="flex w-full items-center gap-2 rounded-lg bg-slate-300 py-3 px-3 font-medium"
        onClick={toggleModal}
      >
        <FaPlus />
        Add Task
      </button>
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
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
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
