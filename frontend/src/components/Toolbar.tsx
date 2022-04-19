import React from "react";
import { Breadcrumb } from "./Breadcrumb";

export const Toolbar: React.FC = () => {
  return (
    <div className="flex justify-between border-b p-2.5">
      <Breadcrumb list={[{ name: "Home", link: "/" }]} />
    </div>
  );
};
