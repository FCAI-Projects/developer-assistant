import { useMutation } from "@apollo/client";
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { ProjectListsDocument, RemoveProjectListsDocument } from "../../graphql/generated/graphql";
import { list } from "../../pages/Project";
import { roleState } from "../../recoil";
import { Editable } from "../Editable";
import { NewTaskModal } from "../modals/NewTaskModal";
import { Card } from "./Card";

interface ListProps {
  list: list;
  index: any;
  projectId: any;
  refetchTasks: () => void;
  updateListName: (listId: string, newName: string) => void;
}

export const ListView: React.FC<ListProps> = ({ list, index, projectId, refetchTasks, updateListName }) => {
  const role = useRecoilValue(roleState);
  const [removeList, { loading }] = useMutation(RemoveProjectListsDocument, {
    refetchQueries: [{ query: ProjectListsDocument, variables: { project: projectId } }],
  });

  return (
    <div>
      <Draggable draggableId={list.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex w-72 flex-row items-center rounded-lg bg-slate-200 px-3 py-3 font-bold text-blue-900"
          >
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1">
                  <header className="mb-5 flex w-full items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      {role.admin || role.editList ? (
                        <Editable value={list.name} onChange={(value) => updateListName(list.id, value)} />
                      ) : (
                        list.name
                      )}
                    </h3>
                    {(role.admin || role.deleteList) && (
                      <button
                        className="p-1 text-sm text-slate-600 hover:text-red-600"
                        onClick={() => {
                          if (list.tasks.length === 0) {
                            console.log(list.tasks.length);
                            removeList({
                              variables: {
                                removeProjectListsId: list.id,
                              },
                            });
                          } else {
                            toast.error("Plese remove all tasks from this list before deleting it");
                          }
                        }}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </header>
                  {list.tasks.map((task, index) => (
                    <Card key={task.id} task={task} index={index} listId={list.id} />
                  ))}
                  {provided.placeholder}

                  {(role.admin || role.createTask) && <NewTaskModal listId={list.id} refetchTasks={refetchTasks} />}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </div>
  );
};
