import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TaskModal } from "./modals/TaskModal";

export const Statusbar: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between border-t bg-slate-50 py-1 px-5 text-sm">
      <div className="flex items-center">
        Statusbar
        <TaskModal />
      </div>
      <div className="flex items-center">
        <Link to="chat">
          <FaCommentDots className="cursor-pointer text-xl text-slate-600" />
        </Link>
      </div>
    </div>
  );
};
