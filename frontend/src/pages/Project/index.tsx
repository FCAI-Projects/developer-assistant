import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { ListView } from "../../components/listsView/ListView";

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
      {
        listId: "list-2",
        listName: "List 3",
        tasks: [
          {
            taskId: "task-5",
            taskName: "Sobhy Task 5",
            taskDescription: "Description",
            taskOwner: "Sobhy",
          },
          {
            taskId: "task-6",
            taskName: "Ezz Task 7",
            taskDescription: "Description",
            taskOwner: "Ezz",
          },
        ],
      },
    ],
  }

  const [Cards, setCards] = useState(cards);

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
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        const newLists = Array.from(Cards.lists);
        const [removedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, removedList);
        setCards({ ...Cards, lists: newLists });
      }
      return;
    }

    // Move card
    sort(
      Cards,{
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
    })

    console.log(Cards.lists)
  };

  return (
    <div className="flex flex-row items-start my-6 mb-20">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {provided => (
            <div ref={provided.innerRef} className="flex flex-row items-start">
              {Cards.lists.map((list, index) => {
                return <ListView list={list} index={index} key={list.listId} />
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