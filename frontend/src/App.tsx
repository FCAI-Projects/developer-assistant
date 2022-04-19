import { Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Regsiter";
import { Projects } from "./pages/Projects";
import { Breadcrumb } from "./components/Breadcrumb";
import { Toolbar } from "./components/Toolbar";
import { Statusbar } from "./components/Statusbar";

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
