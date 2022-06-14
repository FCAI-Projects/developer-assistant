import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreateNoteDocument } from "../../graphql/generated/graphql";
import { Label, Textarea } from "../forms";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

interface AddPrivateNotesModelProps {
  userId: string;
  taskId: any;
}
export const AddPrivateNotesModel: React.FC<AddPrivateNotesModelProps> = ({ userId, taskId }) => {
  const [addNote, { loading }] = useMutation(CreateNoteDocument, { refetchQueries: ["FilterNotes"] });
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema: Yup.object({
      note: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        await addNote({
          variables: {
            createNoteInput: {
              user: userId,
              task: taskId,
              note: values.note,
            },
          },
        });
        formikApi.resetForm({
          values: {
            note: "",
          }
        });
        toggleModal();
        toast.success("Note Added successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button 
        lightBlue 
        className="px-2 py-2 text-xs text-blue-500"
        onClick={toggleModal}
      >
        <FaPlus />
      </Button>
      <Modal title="Add Private Note" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="note">Private Note</Label>
              <Textarea
                id="note"
                placeholder="note"
                {...formik.getFieldProps("note")}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button
            green
            type="submit"
            onClick={() => formik.handleSubmit()}
            loading={loading}
          >
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
