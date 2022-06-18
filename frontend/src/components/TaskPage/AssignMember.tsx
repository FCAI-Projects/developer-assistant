import { useMutation } from "@apollo/client";
import axios from "axios";
import React, { useEffect } from "react";
import { FaGreaterThanEqual, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import {
  AssignMemberDocument,
  RemoveAssignMemberDocument,
  TaskDocument,
  useTaskQuery,
} from "../../graphql/generated/graphql";
import { roleState } from "../../recoil";
import { Button } from "../Button";
import { TaskAssignModal } from "../modals/TaskAssignModel";

interface AssignMemberProps {}

export const AssignMember: React.FC<AssignMemberProps> = () => {
  const role = useRecoilValue(roleState);
  const { taskId = "" } = useParams();
  const { data: taskData, loading: taskLoading } = useTaskQuery({ variables: { taskId } });
  const [deleteMember, { loading: deleteMemberLoading }] = useMutation(RemoveAssignMemberDocument, {
    refetchQueries: [{ query: TaskDocument, variables: { taskId } }],
  });
  const [assignMember, { loading: assignMemberLoading }] = useMutation(AssignMemberDocument, {
    refetchQueries: [{ query: TaskDocument, variables: { taskId: taskId } }],
  });

  const handelDelete = async (memberId: string) => {
    try {
      await deleteMember({
        variables: {
          removeAssignMemberId: taskId,
          member: memberId,
        },
      });
      toast.success("Member Deleted");
    } catch (error) {
      toast.error("Member Can't be deleted");
    }
  };

  return (
    <div className="flex flex-col gap-5 border-b pb-3">
      <header className="flex items-center justify-between">
        <h6 className="mb-1 flex items-center gap-2">
          <FaGreaterThanEqual className="text-sm" />
          Assign Member
        </h6>
        {(role.admin || role.assignTask) && (
          <TaskAssignModal taskData={taskData} assignMember={assignMember} assignMemberLoading={assignMemberLoading} />
        )}
      </header>
      <div className="flex flex-col gap-4">
        {taskData?.task &&
          taskData?.task.assign?.map((member) => (
            <div key={member.id} className="flex items-center gap-2">
              <img
                src={axios.defaults.baseURL + "/uploads/avatars/" + member.avatar}
                alt="Image"
                className="h-8 w-8 rounded-full"
              />
              <h6 className="text-l font-medium">{member.fname + " " + member.lname}</h6>
              {(role.admin || role.unAssignTask) && (
                <Button
                  lightRed
                  className="ml-auto px-2 py-2 text-xs"
                  onClick={() => handelDelete(member.id)}
                  loading={deleteMemberLoading}
                >
                  <FaTrash />
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
