import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ListView } from "../../components/listsView/ListView";
import { Loader } from "../../components/Loader";
import {
  ProjectListsDocument,
  UpdateProjectListsDocument,
  useProjectListsQuery,
} from "../../graphql/generated/graphql";

export interface list {
  id: string;
  name: string;
  color: string;
  tasks: task[];
}

export interface task {
  id: string;
  name: string;
  description: string;
}

type sortAction = {
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
};

export const Project: React.FC = () => {
  const params = useParams();
  const [lists, setLists] = React.useState<list[]>([]);
  const {
    data: listsData,
    loading: listsLoading,
    refetch,
  } = useProjectListsQuery({
    variables: { project: params.id as string },
  });
  const [updateTasks, { error: updateError }] = useMutation(UpdateProjectListsDocument, {
    refetchQueries: [{ query: ProjectListsDocument, variables: { project: params.id } }],
  });

  const updateListName = (listId: string, newName: string) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, name: newName };
      }
      return list;
    });
    setLists(newLists);

    // update database
    updateTasks({
      variables: {
        updateProjectListsInput: {
          id: listId,
          name: newName,
        },
      },
    });
  };

  const sort = (state: any, payload: sortAction) => {
    // same list
    if (payload.droppableIdStart === payload.droppableIdEnd) {
      const list = state.find((list: any) => payload.droppableIdStart === list.id);
      const tasks = [...list.tasks];
      const card = tasks.splice(payload.droppableIndexStart, 1);
      tasks.splice(payload.droppableIndexEnd, 0, ...card);
      const tasksId: any[] = [];
      tasks.map((task) => tasksId.push(task.id));
      // update state
      const newState = lists.map((el: any) => {
        if (list.id === el.id) {
          return {
            ...el,
            tasks: tasks,
          };
        }
        return el;
      });
      setLists(newState);

      // update database
      updateTasks({
        variables: {
          updateProjectListsInput: {
            id: list.id,
            tasks: tasksId,
          },
        },
      });
    }

    // other list
    if (payload.droppableIdStart !== payload.droppableIdEnd) {
      const listStart: any = state.find((list: any) => payload.droppableIdStart === list.id);
      const tasksStart = [...listStart.tasks];
      const card = tasksStart.splice(payload.droppableIndexStart, 1);
      const listEnd: any = state.find((list: any) => payload.droppableIdEnd === list.id);
      const tasksEnd = [...listEnd.tasks];
      tasksEnd.splice(payload.droppableIndexEnd, 0, ...card);

      const listStartIds: any[] = [];
      tasksStart.map((task: { id: any }) => listStartIds.push(task.id));
      const listEndIds: any[] = [];
      tasksEnd.map((task: { id: any }) => listEndIds.push(task.id));

      // update state
      const newState = lists.map((el: any) => {
        if (listStart.id === el.id) {
          return {
            ...el,
            tasks: tasksStart,
          };
        } else if (listEnd.id === el.id) {
          return {
            ...el,
            tasks: tasksEnd,
          };
        }
        return el;
      });
      setLists(newState);

      // update database
      updateTasks({
        variables: {
          updateProjectListsInput: {
            id: listStart.id,
            tasks: listStartIds,
          },
        },
      });

      updateTasks({
        variables: {
          updateProjectListsInput: {
            id: listEnd.id,
            tasks: listEndIds,
          },
        },
      });
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      console.log("move list");
      console.log(result);
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        const newLists = [...lists];
        const removedList = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, removedList[0]);
        setLists(newLists);

        // update database
        newLists.forEach((list: any, index) => {
          updateTasks({
            variables: {
              updateProjectListsInput: {
                id: list.id,
                index: index,
              },
            },
          });
        });
      }
      return;
    }

    // Move card
    sort(lists, {
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
    });
  };

  useEffect(() => {
    if (listsData) {
      setLists(listsData.projectLists);
    }
  }, [listsData]);

  useEffect(() => {
    if (updateError) {
      console.log(updateError);
      toast.error("Something went wrong! The list not updated.");
    }
  }, [updateError]);

  if (listsLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-row items-start gap-5 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div ref={provided.innerRef} className="flex flex-row items-start gap-5">
              {lists.map((list, index) => {
                return (
                  <ListView
                    list={list}
                    index={index}
                    key={list.id}
                    projectId={params.id}
                    refetchTasks={refetch}
                    updateListName={updateListName}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
