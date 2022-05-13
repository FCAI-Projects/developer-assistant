import { Routes, Route } from "react-router-dom";
import React from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Regsiter";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { ProjectConfig } from "./pages/Project/Config";
import { ProjectRoles } from "./pages/Project/Roles";
import { ProjectMembers } from "./pages/Project/Members";
import { Settings } from "./pages/Settings";
import { ProjectLayout } from "./layouts/ProjectLayout";
import { AppLayout } from "./layouts/AppLayout";

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/app">
          <Route element={<AppLayout />}>
            <Route index element={<Projects />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="project/:id" element={<ProjectLayout />}>
            <Route index element={<Project />} />

            <Route path="settings">
              <Route index element={<ProjectConfig />} />
              <Route path="roles" element={<ProjectRoles />} />
              <Route path="members" element={<ProjectMembers />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
