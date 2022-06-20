import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import {
  GroupsDocument,
  UpdateGroupDocument,
  useFilterMembersQuery,
  useProjectsQuery,
} from "../../graphql/generated/graphql";
import { CustomSelect, Input, Label, Multiselect } from "../forms";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

interface formikProps {
  name: string;
  project: { id: string; name: string };
  members: { id: string; name: string }[] | [];
}

interface UpdateGroupProps {
  groupId: string;
  name: string;
  projectInGroup: { id: string; name: string };
  membersInGroup: { id: string; name: string }[] | [];
}

export const UpdateGroupModel: React.FC<UpdateGroupProps> = ({ groupId, name, projectInGroup, membersInGroup }) => {
  const [updateGroup, { loading }] = useMutation(UpdateGroupDocument, {
    refetchQueries: [{ query: GroupsDocument }],
  });
  const { data: projects } = useProjectsQuery();
  const { data: members, refetch: refetchMembers } = useFilterMembersQuery({
    variables: { filter: { project: "" } },
  });
  const [projectOptions, setProjectOptions] = useState<any>([]);
  const [membersOptions, setMembersOptions] = useState<any>([]);
  const [isOpen, toggleModal] = useToggleModal();

  const formik = useFormik<formikProps>({
    initialValues: {
      name: name,
      project: projectInGroup,
      members: membersInGroup,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      project: Yup.object().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        updateGroup({
          variables: {
            updateGroupInput: {
              id: groupId,
              name: values.name,
              project: values.project.id,
              members: values.members.map((member) => member.id),
            },
          },
        });
        toggleModal();
        toast.success("Group updated successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (projects)
      setProjectOptions(
        projects.projects.map((project: any) => ({
          id: project.id,
          name: project.name,
        }))
      );
  }, [projects]);

  useEffect(() => {
    if (members) {
      setMembersOptions(
        members.filterMembers.map((member: any) => ({
          id: member.user.id,
          name: member.user.fname + " " + member.user.lname,
        }))
      );
    }
  }, [members]);

  return (
    <>
      <FaEdit className="cursor-pointer text-lg text-slate-700" onClick={toggleModal} />
      <Modal title="Update Group" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Group Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name ? formik.errors.name : ""}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="project">Project</Label>
              <CustomSelect
                options={projectOptions}
                value={formik.values.project}
                onChange={(e) => {
                  formik.setFieldValue("project", e);
                  refetchMembers({ filter: { project: e.id } });
                }}
                label="name"
                id="id"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="members">Members</Label>
              <Multiselect
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
          <Button type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
            Submit
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
