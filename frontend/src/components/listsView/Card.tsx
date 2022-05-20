import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { task } from "../../pages/Project";

interface CardProps {
  task: task;
  listId: string;
  index: any; 
}
  
export const Card: React.FC<CardProps> = ({ task, listId, index }) => {

    return(
      <Draggable draggableId={task.taskId} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white rounded-xl p-3 my-3"
          >
            <div className="font-bold">{task.taskName}</div>
            <div className="text-gray-bold">{task.taskDescription}</div>
          </div>
        )}
      </Draggable>
    );
}