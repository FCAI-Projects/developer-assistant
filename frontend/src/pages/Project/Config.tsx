import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import { ProjectSettings } from "./Settings";
import { ProjectMembers } from "./Members";
import { ProjectRoles } from "./Roles";

export const ProjectConfig: React.FC = () => {
  const tabs = useMemo(() => ["Settings", "Members", "Roles"], []);

  return (
    <div className="container mx-auto">
      <Tab.Group vertical>
        <div className="flex gap-5 py-5">
          <Tab.List className="flex flex-col gap-3">
            {tabs.map((el, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "text-md rounded-lg px-10 py-3",
                    selected ? "bg-blue-700 text-white" : "bg-slate-200 text-black"
                  )
                }
              >
                {el}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="flex-1">
            <Tab.Panel>
              <ProjectSettings />
            </Tab.Panel>
            <Tab.Panel>
              <ProjectMembers />
            </Tab.Panel>
            <Tab.Panel>
              <ProjectRoles />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
