import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Button } from "./Button";

export const Toolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b p-2.5">
      <div>
        <Breadcrumb list={[{ name: "Home", link: "/" }]} />
      </div>
      <div>
        <Button lightRed className="px-3 py-2 text-xs">
          Logout
        </Button>
      </div>
    </div>
  );
};
