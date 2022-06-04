import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
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
import { useRecoilValue } from "recoil";
import { authState } from "./recoil";
import { Chat } from "./pages/Chat";
import { Calendar } from "./pages/Calendar";
import { Task } from "./pages/Project/Task";
import { Invitations } from "./pages/Invitations";

export const App: React.FC = () => {
  const authToken = useRecoilValue(authState);

  const RedirectToLogin: React.FC = () => {
    if (!authToken) return <Navigate to="/login" />;
    return <Outlet />;
  };

  const RedirectToApp: React.FC = () => {
    if (authToken) return <Navigate to="/app" />;
    return <Outlet />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<RedirectToApp />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/app" element={<RedirectToLogin />}>
          <Route element={<AppLayout />}>
            <Route index element={<Projects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="invitations" element={<Invitations />} />
          </Route>

          <Route path="project/:id" element={<ProjectLayout />}>
            <Route index element={<Project />} />

            <Route path="task/:taskId" element={<Task />} />

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
