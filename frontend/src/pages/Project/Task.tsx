import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Button } from "../../components/Button";
import { Editable } from "../../components/Editable";
import { Loader } from "../../components/Loader";
import { AssignMember } from "../../components/TaskPage/AssignMember";
import { Attachments } from "../../components/TaskPage/Attachments";
import { Comments } from "../../components/TaskPage/Comments";
import { Deadline } from "../../components/TaskPage/Deadline";
import { Docs } from "../../components/TaskPage/Docs";
import { PrivateNote } from "../../components/TaskPage/PrivateNote";
import { StartDate } from "../../components/TaskPage/StartDate";
import { TimeTracking } from "../../components/TaskPage/TimeTracking";
import {
  ProjectListsDocument,
  RemoveTaskDocument,
  TaskByIdDocument,
  TaskDocument,
  UpdateTaskDocument,
  useTaskByIdQuery,
} from "../../graphql/generated/graphql";
import { roleState } from "../../recoil";

export const Task: React.FC = () => {
  const navigate = useNavigate();
  const { taskId = "" } = useParams();
  const projectId = useParams();
  const role = useRecoilValue(roleState);
  const {
    data: taskData,
    loading: taskLoading,
    refetch: refetchTask,
  } = useTaskByIdQuery({ variables: { taskId: taskId } });
  const [updateTask, { error: updateError }] = useMutation(UpdateTaskDocument, {
    refetchQueries: [{ query: TaskByIdDocument, variables: { taskId: taskId } }],
  });
  const [deleteTask, { error: deletError }] = useMutation(RemoveTaskDocument, {
    refetchQueries: [{ query: ProjectListsDocument, variables: { project: projectId.id } }],
  });

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
              {role.admin || role.editTask ? (
                <Editable value={taskData?.task.name} onChange={(value) => handleUpdateTask("name", value)} />
              ) : (
                taskData?.task.name
              )}
            </h2>
          </header>
          <div>
            {role.admin || role.editTask ? (
              <Editable
                value={taskData?.task.description}
                onChange={(value) => handleUpdateTask("description", value)}
                tag="p"
              />
            ) : (
              taskData?.task.description
            )}
          </div>
          <Docs handleUpdateTask={handleUpdateTask} docs={taskData?.task.docs} />
          <Comments />
        </div>
        <div className="flex basis-2/6 flex-col gap-5">
          <TimeTracking taskId={taskId} />
          <StartDate handleUpdateTask={handleUpdateTask} startDate={taskData?.task.startedAt} />
          <Deadline handleUpdateTask={handleUpdateTask} deadline={taskData?.task.deadline} />
          {taskData?.task.status === "done" && (
            <div className="flex items-center justify-between">
              <p>This Task is done</p>
              <Button lightYellow onClick={() => handleUpdateTask("status", "todo")}>
                Reset
              </Button>
            </div>
          )}
          {taskData?.task.status === "todo" && (
            <Button yellow onClick={() => handleUpdateTask("status", "doing")}>
              Doing
            </Button>
          )}
          {taskData?.task.status === "doing" && (
            <Button green onClick={() => handleUpdateTask("status", "done")}>
              Done
            </Button>
          )}
          <AssignMember />
          <PrivateNote />
          <Attachments data={taskData?.task.attachments} id={taskId} refetchTask={refetchTask} />

          {(role.admin || role.deleteTask) && (
            <Button
              lightRed
              className="flex items-center justify-center gap-2"
              onClick={async () => {
                try {
                  await deleteTask({
                    variables: {
                      removeTaskId: taskId,
                    },
                  });
                  toast.success("Task deleted");
                  navigate("/app/project/" + projectId.id);
                } catch (error) {
                  toast.error("Can't delete task");
                }
              }}
            >
              <FaTrash /> Delete Task
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
