import React from "react";
import { FaCalendarAlt, FaCog, FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TaskModal } from "./modals/TaskModal";

export const Statusbar: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between border-t bg-slate-50 py-2 px-5 text-sm">
      <div className="flex items-center">{/* <TaskModal /> */}</div>
      <div className="flex items-center gap-5 text-xl text-slate-600">
        <Link to="/app/settings">
          <FaCog className="cursor-pointer" />
        </Link>
        <Link to="/app/calendar">
          <FaCalendarAlt className="cursor-pointer" />
        </Link>
        <Link to="/app/chat">
          <FaCommentDots className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};
