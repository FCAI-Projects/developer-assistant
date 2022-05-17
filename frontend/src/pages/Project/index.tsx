import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";

export interface board {
  boardId: string;
  boardName: string;
  lists: list[];
}

export interface list {
  listId: string;
  listName: string;
  tasks: task[];
}

export interface task {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskOwner: string;
}

type sortAction = {
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
};

export const Project: React.FC = () => {
  const cards: board = 
  {
    boardId: "board-0",
    boardName: "First board",
    lists: [
      {
        listId: "list-0",
        listName: "List 1",
        tasks: [
          {
            taskId: "task-0",
            taskName: "Task 1",
            taskDescription: "Description",
            taskOwner: "Anton",
          },
          {
            taskId: "task-1",
            taskName: "Task 2",
            taskDescription: "Description",
            taskOwner: "Anton",
          },
          {
            taskId: "task-2",
            taskName: "Task 3",
            taskDescription: "Description",
            taskOwner: "Anton",
          },
        ],
      },
      {
        listId: "list-1",
        listName: "List 2",
        tasks: [
          {
            taskId: "task-3",
            taskName: "Task 1",
            taskDescription: "Description",
            taskOwner: "Anton",
          },
          {
            taskId: "task-4",
            taskName: "Task 2",
            taskDescription: "Description",
            taskOwner: "Anton",
          },
        ],
      },
    ],
  }

  const [Cards] = useState(cards);

  const sort = (state: board, payload : sortAction) => {
    // same list
    if (payload.droppableIdStart === payload.droppableIdEnd) {
      const list: any = state.lists.find(
        list => payload.droppableIdStart === list.listId
      );
      const card = list.tasks.splice(payload.droppableIndexStart, 1);
      list?.tasks.splice(payload.droppableIndexEnd, 0, ...card);
    }

    // other list
    if (payload.droppableIdStart !== payload.droppableIdEnd) {
      const listStart: any = state.lists.find(
        list => payload.droppableIdStart === list.listId
      );
      const card = listStart.tasks.splice(payload.droppableIndexStart, 1);
      const listEnd: any = state.lists.find(
        list => payload.droppableIdEnd === list.listId
      );
      listEnd.tasks.splice(payload.droppableIndexEnd, 0, ...card);
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    sort(
      Cards,{
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
    })
  };

  return (
    <div className="flex flex-row items-start mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* All Lists ...*/}
        {Cards.lists.map( list => (
          <div 
            className="w-60 h-fit bg-gray-200 rounded-2xl p-3 mr-6"
            key={list.listId}>
            <Droppable droppableId={list.listId}>
            {(provided) => (
              <div
                {...provided.droppableProps} 
                ref={provided.innerRef} >
                <div className="text-cyan-800 font-bold text-lg ml-2">{list.listName}</div>
                {/* All tasks in list ...*/}
                {list.tasks.map((task, index) => (
                  // task ...
                  <div key={task.taskId} >
                    <Draggable draggableId={task.taskId} index={index}>
                      {provided => (
                        <div 
                          className="bg-white rounded-xl p-3 my-3"
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} >
                          
                          <div className="font-bold">{task.taskName}</div>
                          <div className="text-gray-bold">{task.taskDescription}</div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
                <div className="flex flex-row items-center bg-gray-200 text-cyan-800 font-bold rounded-md px-2 py-1 ">
                  <BsPlusLg className=" mr-2" />
                  Add Task
                </div>
              </div>
            )}
          </Droppable>
        </div>
        ))}
      </DragDropContext>
      <div className="w-60 flex flex-row items-center bg-gray-200 text-cyan-800 font-bold rounded-xl px-4 py-2 ">
        <BsPlusLg className=" mr-2" />
        Add List
      </div>
    </div>
  );
};