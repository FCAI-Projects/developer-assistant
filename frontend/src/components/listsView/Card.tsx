import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { task } from "../../pages/Project";

interface CardProps {
  task: task;
  listId: string;
  index: any;
}

export const Card: React.FC<CardProps> = ({ task, listId, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Link to={`task/${task.id}`} className="cursor-pointer">
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-3 w-full rounded-lg bg-white py-4 px-3"
          >
            <h5 className="font-bold text-slate-800">{task.name}</h5>
            <p className="font-normal text-slate-600">{task.description}</p>
          </div>
        </Link>
      )}
    </Draggable>
  );
};
