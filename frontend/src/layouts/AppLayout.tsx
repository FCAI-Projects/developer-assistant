import React from "react";
import { Outlet } from "react-router-dom";
import { Statusbar } from "../components/Statusbar";
import { Toolbar } from "../components/Toolbar";

export const AppLayout: React.FC = () => {
  return (
    <>
      <div className="mx-5">
        <Toolbar logoutButton={true} newProjectModal={true} />
        <Outlet />
      </div>
      <Statusbar />
    </>
  );
};
