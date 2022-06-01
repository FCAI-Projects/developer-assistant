import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { list, task } from "../../pages/Project";
import { Card } from "./Card";

interface ListProps {
  list: task[];
  index: any;
}
  
export const Unlists: React.FC<any> = ({ list, index }) => {

    return(
      <div>
        <Draggable draggableId="-1" index={index}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps} 
              className="w-72 h-fit bg-gray-200 rounded-2xl p-3 mr-6" >
              <Droppable droppableId="-1">
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <div className="text-cyan-800 font-bold text-lg ml-2">Unlist Tasks</div>
                    {list && list.map((task: task, index: any) => (
                      <Card 
                        key={task.id} 
                        task={task} 
                        index={index} 
                        listId={list.id}
                      />
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
          )}
        </Draggable>
      </div>
    );
}