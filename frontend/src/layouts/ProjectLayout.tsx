import React from "react";
import { Outlet } from "react-router-dom";
import { Statusbar } from "../components/Statusbar";
import { Toolbar } from "../components/Toolbar";

export const ProjectLayout: React.FC = () => {
  return (
    <>
      <div className="mx-5 pb-12">
        <Toolbar logoutButton={true} newTaskModal={true} inviteMemberModal={true} projectSettings={true} />
        <Outlet />
      </div>
      <Statusbar />
    </>
  );
};
