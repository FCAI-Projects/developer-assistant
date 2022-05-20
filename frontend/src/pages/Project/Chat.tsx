import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import { ProjectSettings } from "./Settings";
import { ProjectMembers } from "./Members";
import { ProjectRoles } from "./Roles";

export const Chat: React.FC = () => {
  const tabs = useMemo(() => ["Settings", "Members", "Roles"], []);

  return (
    <div className="container mx-auto">
      <h3 className="my-5 text-2xl font-medium">Chat</h3>
      <div className="flex">
        <div className="w-1/12 bg-slate-200">
          <ul>
            <li className="cursor-pointer bg-slate-400 p-3">Chat 1</li>
            <li className="cursor-pointer p-3">Chat 2</li>
            <li className="cursor-pointer p-3">Chat 3</li>
          </ul>
        </div>
        <div className="flex-1 bg-slate-200">
          <h4 className="bg-slate-300 p-3 text-xl">Chat Name</h4>
        </div>
      </div>
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
