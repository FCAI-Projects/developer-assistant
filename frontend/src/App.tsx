import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import { Video } from "./pages/Video";
import { Statistics } from "./pages/Statistics";
import { onMessageListener } from "./firebaseInit";
import ReactNotificationComponent from "./components/Notifications/ReactNotification";
import Notifications from "./components/Notifications/Notifications";
import { toast } from "react-toastify";

export const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const authToken = useRecoilValue(authState);

  const RedirectToLogin: React.FC = () => {
    if (!authToken) return <Navigate to="/login" />;
    return <Outlet />;
  };

  const RedirectToApp: React.FC = () => {
    if (authToken) return <Navigate to="/app" />;
    return <Outlet />;
  };

  onMessageListener()
    .then((payload: any) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      toast.info(payload.notification.body);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="min-h-screen bg-slate-50">
      <Notifications />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<RedirectToApp />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/app" element={<RedirectToLogin />}>
          <Route path="statistics" element={<Statistics />} />
          <Route element={<AppLayout />}>
            <Route index element={<Projects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/video/:group" element={<Video />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="invitations" element={<Invitations />} />
          </Route>

          <Route path="project/:id" element={<ProjectLayout />}>
            <Route index element={<Project />} />

            <Route path="task/:taskId" element={<Task />} />

            <Route path="settings">
              <Route index element={<ProjectConfig />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
