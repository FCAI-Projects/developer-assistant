import { useMutation } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Editable } from "../../components/Editable";
import { Loader } from "../../components/Loader";
import { AssignMember } from "../../components/TaskPage/AssignMember";
import { Attachments } from "../../components/TaskPage/Attachments";
import { Comments } from "../../components/TaskPage/Comments";
import { Deadline } from "../../components/TaskPage/Deadline";
import { Docs } from "../../components/TaskPage/Docs";
import { PrivateNote } from "../../components/TaskPage/PrivateNote";
import { TimeTracking } from "../../components/TaskPage/TimeTracking";
import { UpdateTaskDocument, useTaskByIdQuery } from "../../graphql/generated/graphql";

export const Task: React.FC = () => {
  const { taskId = "" } = useParams();
  const {
    data: taskData,
    loading: taskLoading,
    refetch: refetchTask,
  } = useTaskByIdQuery({ variables: { taskId: taskId } });
  const [updateTask, { error: updateError }] = useMutation(UpdateTaskDocument);

  const handleUpdateTask = async (field: string, value: string) => {
    await updateTask({
      variables: {
        updateTaskId: taskId,
        updateTaskInput: {
          [field]: value,
        },
      },
    });
    toast.success("Task updated");
  };

  useEffect(() => {
    if (taskId) {
      refetchTask();
    }
    if (updateError) {
      toast.error("Error updating task");
    }
  }, [taskId, updateError]);

  if (taskLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between gap-5">
        <div className="flex basis-4/6 flex-col gap-5">
          <header>
            <h2 className="text-3xl font-bold">
              <Editable value={taskData?.task.name} onChange={(value) => handleUpdateTask("name", value)} />
            </h2>
          </header>
          <div>
            <Editable
              value={taskData?.task.description}
              onChange={(value) => handleUpdateTask("description", value)}
              tag="p"
            />
          </div>
          <Docs />
          <Comments />
        </div>
        <div className="flex basis-2/6 flex-col gap-5">
          <TimeTracking taskId={taskId} />
          <Deadline handleUpdateTask={handleUpdateTask} deadline={taskData?.task.deadline} />
          <AssignMember />
          <PrivateNote />
          <Attachments data={taskData?.task.attachments} id={taskId} refetchTask={refetchTask} />
        </div>
      </div>
    </div>
  );
};
