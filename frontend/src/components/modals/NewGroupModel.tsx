import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation, useQuery } from "react-query";
import { FilterMembersDocument, useFilterMembersQuery, useProjectsQuery } from "../../graphql/generated/graphql";
import { CustomSelect, Input, Label, Multiselect } from "../forms";
import { FaPlus } from "react-icons/fa";

interface formikProps {
  name: string;
  project: { id: string; name: string };
  members: { id: string; name: string }[] | [];
}

export const NewGroupModel: React.FC = () => {
  var projectId: string = "";
  const { data: projects } = useProjectsQuery();
  const { data: members, refetch: refetchMembers } = useFilterMembersQuery({
    variables: { filter: { project: projectId } },
  });
  const [projectOptions, setProjectOptions] = useState<any>([]);
  const [membersOptions, setMembersOptions] = useState<any>([]);
  const [isOpen, toggleModal] = useToggleModal();

  const formik = useFormik<formikProps>({
    initialValues: {
      name: "",
      project: { id: "", name: "" },
      members: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      project: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
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
      console.log(members);
      setMembersOptions(
        members.filterMembers.map((member: any) => ({
          id: member.user.id,
          name: member.user.fname + " " + member.user.lname,
        }))
      );
    }
  }, [members?.filterMembers]);

  console.log(membersOptions);

  return (
    <>
      <button
        className="mx-auto mt-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-white"
        onClick={toggleModal}
      >
        <FaPlus />
      </button>
      <Modal title="Create New Group" isOpen={isOpen} handleClose={toggleModal}>
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
          <Button type="submit" onClick={() => formik.handleSubmit()}>
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
