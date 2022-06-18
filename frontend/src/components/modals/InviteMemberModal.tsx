import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { InvitedMemberDocument, InviteMemberDocument, useRolesQuery } from "../../graphql/generated/graphql";
import { CustomSelect, Input, Label } from "../forms";
import { FaPlus, FaUserPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface formikProps {
  member: string;
  role: { id: string; name: string };
}
export const InviteMemberModal: React.FC = () => {
  const params = useParams();
  const [rolesOptions, setRolesOptions] = useState<any>([]);
  const { data: Roles } = useRolesQuery({ variables: { project: params.id as string } });
  const [InviteMember, { loading }] = useMutation(InviteMemberDocument);
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik<formikProps>({
    initialValues: {
      member: "",
      role: { id: "0", name: "Choose Role" },
    },
    validationSchema: Yup.object({
      member: Yup.string().email().required("Required"),
      role: Yup.object().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values.role.id === "0") {
          toast.error("Please select a role");
          return;
        }
        await InviteMember({
          variables: {
            inviteMemberInput: {
              project: params.id,
              user: values.member,
              role: values.role.id,
            },
          },
        });
        toast.success("Member has been invited !");
        toggleModal();
      } catch (error: any) {
        toast.error(error.message);
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
      <Button lightBlue className="flex items-center gap-2 px-3 py-2 text-xs" onClick={toggleModal}>
        <FaUserPlus /> Invite Member
      </Button>
      <Modal title="invite Member" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="member">Member Email</Label>
              <Input id="member" type="email" placeholder="Member Email" {...formik.getFieldProps("member")} />
            </div>
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
          <Button type="submit" green onClick={() => formik.handleSubmit()} loading={loading}>
            Invite
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
