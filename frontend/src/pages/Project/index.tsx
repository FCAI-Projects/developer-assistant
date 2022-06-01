import { useMutation } from "@apollo/client";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { ListView } from "../../components/listsView/ListView";
import { Unlists } from "../../components/listsView/Unlists";
import { ProjectListsDocument, UpdateProjectListsDocument, useProjectListsQuery, useUnlistedTasksQuery } from "../../graphql/generated/graphql";

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
  const projectId = useParams();
  const UnlistsTasks = useUnlistedTasksQuery({variables: {project: projectId.id as string}});
  const Lists = useProjectListsQuery({variables: {project: projectId.id as string}});
  const [updateTasks, { loading }] = useMutation(UpdateProjectListsDocument, {
    refetchQueries: [{ query: ProjectListsDocument, variables: { project: projectId.id } }]
  });

  const sort = (state: any, payload : sortAction) => {
    // same list
    if (payload.droppableIdStart === payload.droppableIdEnd) {
      const data = state;
      const list = data.find( (list : any) => payload.droppableIdStart === list.id );
      const tasks = [...list.tasks];
      const card = tasks.splice(payload.droppableIndexStart, 1);
      tasks.splice(payload.droppableIndexEnd, 0, ...card);
      const tasksId: any[] = [];
      tasks.map(task => tasksId.push(task.id));
      updateTasks({
        variables: {
          updateProjectListsInput: {
            id: list.id,
            tasks: tasksId,
          }
        }
      })
    }

    // other list
  //   if (payload.droppableIdStart !== payload.droppableIdEnd) {
  //     const listStart: any = state.lists.find(
  //       list => payload.droppableIdStart === list.listId
  //     );
  //     const card = listStart.tasks.splice(payload.droppableIndexStart, 1);
  //     const listEnd: any = state.lists.find(
  //       list => payload.droppableIdEnd === list.listId
  //     );
  //     listEnd.tasks.splice(payload.droppableIndexEnd, 0, ...card);
  //   }
  };

  const onDragEnd = (result: any) => {
     const { destination, source, draggableId } = result;

     if (!destination) return;

    // Move list
  //   if (type === "COLUMN") {
      // Prevent update if nothing has changed
  //     if (source.index !== destination.index) {
  //       const newLists = Array.from(Cards.lists);
  //       const [removedList] = newLists.splice(source.index, 1);
  //       newLists.splice(destination.index, 0, removedList);
  //       setCards({ ...Cards, lists: newLists });
  //     }
  //     return;
  //   }

    // Move card
    sort(
      Lists.data?.projectLists,{
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
    })
  };

  return (
    <div className="flex flex-row items-start mt-6 h-[80vh] overflow-x-scroll overflow-y-h  ">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {provided => (
            <div ref={provided.innerRef} className="flex flex-row items-start">
              <Unlists list={UnlistsTasks.data?.unlistedTasks} index={-1}/>
              {Lists.data && Lists.data?.projectLists.map((list, index) => {
                return <ListView list={list} index={index} key={list.id} />
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="w-72 flex flex-row items-center bg-gray-200 text-cyan-800 font-bold rounded-xl px-4 py-2 ">
        <BsPlusLg className=" mr-2" />
        Add List
      </div>
    </div>
  );
};