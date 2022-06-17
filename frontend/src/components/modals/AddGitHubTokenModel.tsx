import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { UpdateUserDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

export const AddGitHubTokenModel: React.FC = () => {
  const [addGithubToken, { loading }] = useMutation(UpdateUserDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: Yup.object({
      token: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        await addGithubToken({
          variables: {
            user: {
              githubToken: values.token,
            },
          },
        });
        formikApi.resetForm({
          values: {
            token: "",
          },
        });
        toggleModal();
        toast.success("GitHub Token Added successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button lightRed className="flex items-center gap-2" onClick={toggleModal}>
        <FaKey />
        Set GitHub Token
      </Button>
      <Modal title="Set GitHub Token" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="token">GitHub Token</Label>
              <Input
                type="text"
                id="token"
                placeholder="Token"
                {...formik.getFieldProps("token")}
                error={formik.touched.token ? formik.errors.token : ""}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button green type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
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
