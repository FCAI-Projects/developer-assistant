import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";
import { list } from "../../pages/Project";
import { NewTaskModal } from "../modals/NewTaskModal";
import { Card } from "./Card";

interface ListProps {
  list: list;
  index: any;
  refetchTasks: () => void;
}

export const ListView: React.FC<ListProps> = ({ list, index, refetchTasks }) => {
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
                    <div className="text-lg font-bold text-slate-900">{list.name}</div>
                    <button className="text-sm text-slate-600 hover:text-red-600">
                      <FaTrash />
                    </button>
                  </header>
                  {list.tasks.map((task, index) => (
                    <Card key={task.id} task={task} index={index} listId={list.id} />
                  ))}
                  {provided.placeholder}

                  <NewTaskModal listId={list.id} refetchTasks={refetchTasks} />
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </div>
  );
};
