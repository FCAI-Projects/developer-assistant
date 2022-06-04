import React from "react";
import { FaGreaterThanEqual, FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "../Button";

interface AssignMemberProps {}

export const AssignMember: React.FC<AssignMemberProps> = () => {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <h6 className="mb-1 flex items-center gap-2">
          <FaGreaterThanEqual className="text-sm" />
          Assign
        </h6>
        <Button lightBlue className="px-2 py-2 text-xs text-blue-500">
          <FaPlus />
        </Button>
      </header>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt=""
            className="h-8 w-8 rounded-full"
          />
          <h6 className="text-lg">John Doe</h6>
          <Button lightRed className="ml-auto px-2 py-2 text-xs">
            <FaTrash />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt=""
            className="h-8 w-8 rounded-full"
          />
          <h6 className="text-lg">John Doe</h6>
          <Button lightRed className="ml-auto px-2 py-2 text-xs">
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};
