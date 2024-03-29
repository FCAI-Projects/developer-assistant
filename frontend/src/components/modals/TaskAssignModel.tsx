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
import { CustomSelect, Label } from "../forms";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface AssignMemberProps {
  assignMember: any;
  assignMemberLoading: boolean;
  taskData: any;
}

export const TaskAssignModal: React.FC<AssignMemberProps> = ({ assignMember, assignMemberLoading, taskData }) => {
  const params = useParams();
  const [membersOptions, setMembersOptions] = useState<any>([]);
  const { data: members } = useMembersByProjectQuery({ variables: { projectId: params.id as string } });
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      members: { id: "0", name: "Choose member" },
    },
    validationSchema: Yup.object({
      members: Yup.object().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        if (values.members.id === "0") {
          return toast.error("Please select a member");
        }
        await assignMember({
          variables: {
            assignMemberId: params.taskId,
            member: values.members.id,
          },
        });
        formikApi.resetForm({
          values: {
            members: { id: "0", name: "Choose member" },
          },
        });
        toast.success("Member assigned");
        toggleModal();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (members) {
      let membersOptions: any = members.membersByProject.map((member: any) => ({
        id: member.user.id,
        name: member.user.fname + " " + member.user.lname,
      }));
      membersOptions = membersOptions.filter(
        (member: any) => taskData?.task.assign?.findIndex((el: any) => el.id === member.id) === -1
      );
      setMembersOptions(membersOptions);
    }
  }, [members, taskData]);

  return (
    <>
      <Button lightBlue className="px-2 py-2 text-xs text-blue-500" onClick={toggleModal}>
        <FaPlus />
      </Button>
      <Modal title="Assign Member" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="members">Member</Label>
              <CustomSelect
                options={membersOptions}
                value={formik.values.members}
                onChange={(e) => {
                  formik.setFieldValue("members", e);
                }}
                label="name"
                id="id"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button type="submit" green onClick={() => formik.handleSubmit()} loading={assignMemberLoading}>
            Assign
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
