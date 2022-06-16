import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { UpdateMemberDocument, useRolesQuery } from "../../graphql/generated/graphql";
import { CustomSelect, Label } from "../forms";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface updateMemberProps {
  memberId: string;
  roleId: any;
  roleName: any;
  refetch: () => void;
}

export const UpdateMemberModel: React.FC<updateMemberProps> = ({ memberId, roleId, roleName, refetch }) => {
  const params = useParams();
  const [rolesOptions, setRolesOptions] = useState<any>([]);
  const { data: Roles } = useRolesQuery({ variables: { project: params.id as string } });
  const [updateMember, { loading: updateLoading}] = useMutation(UpdateMemberDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      role: { id: roleId, name: roleName },
    },
    validationSchema: Yup.object({
      role: Yup.object().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values.role.id === "0") {
          toast.error("Please select a role");
          return;
        }
        await updateMember({
          variables: {
            updateMemberId: memberId,
            updateMemberInput: {
              role: values.role.id,
            },
          },
        });
        toast.success("Role updated");
        toggleModal();
        refetch();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (Roles)
      setRolesOptions(
        Roles.roles.map((role: any) => ({
          id: role.id,
          name: role.name,
        }))
      );
  }, [Roles]);

  return (
    <>
      <Button lightYellow className="flex items-center gap-2 px-4 py-3" onClick={toggleModal}>
        <FaEdit />
      </Button>
      <Modal title="Update Member" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="role">Role</Label>
              <CustomSelect
                options={rolesOptions}
                value={formik.values.role}
                onChange={(e) => {
                  formik.setFieldValue("role", e);
                }}
                label="name"
                id="id"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" green onClick={() => formik.handleSubmit()} loading={updateLoading}>
            Send
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
