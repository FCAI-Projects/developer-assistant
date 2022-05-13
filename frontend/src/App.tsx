import { Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Regsiter";
import { Projects } from "./pages/Projects";
import { Breadcrumb } from "./components/Breadcrumb";
import { Toolbar } from "./components/Toolbar";
import { Statusbar } from "./components/Statusbar";
import { Project } from "./pages/Project";
import { ProjectSettings } from "./pages/Project/Settings";
import { ProjectRoles } from "./pages/Project/Roles";
import { ProjectMembers } from "./pages/Project/Members";
import { Settings } from "./pages/Settings";

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Projects />} />
          <Route path="settings" element={<Settings />} />

          <Route path="project/:id" element={<ProjectLayout />}>
            <Route index element={<Project />} />

            <Route path="settings">
              <Route index element={<ProjectSettings />} />
              <Route path="roles" element={<ProjectRoles />} />
              <Route path="members" element={<ProjectMembers />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <>
      <div className="mx-5">
        <Toolbar />
        <Outlet />
      </div>
      <Statusbar />
    </>
  );
};

const ProjectLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
