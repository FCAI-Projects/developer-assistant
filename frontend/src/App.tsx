import { Routes, Route, Outlet } from "react-router-dom";
import React from "react";
import { ProjectCard } from "./components/ProjectCard";

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index />
          <Route path="login" />
          <Route path="register" />
        </Route>
        <Route path="/app">
          <Route index />
          <Route path="login" />
          <Route path="register" />
        </Route>
      </Routes>
    </div>
  );
};
