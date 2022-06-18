import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import { ProjectSettings } from "./Settings";
import { ProjectMembers } from "./Members";
import { ProjectRoles } from "./Roles";
import { ProjectExpenses } from "./Expenses";
import { SendMails } from "./SendMails";
import { ProjectPayments } from "./Payments";
import { useRecoilValue } from "recoil";
import { roleState } from "../../recoil";

export const ProjectConfig: React.FC = () => {
  const role = useRecoilValue(roleState);
  const tabs = useMemo(() => {
    const tabs = [];
    if (role.admin) {
      return ["Settings", "Members", "Roles", "Expenses", "Mails", "Payments"];
    }

    if (role.editProject) {
      tabs.push("Settings");
    }
    if (role.editMember || role.deleteMember || role.inviteMember) {
      tabs.push("Members");
    }
    if (role.manageRoles) {
      tabs.push("Roles");
    }
    if (role.manageExpenses) {
      tabs.push("Expenses");
    }
    if (role.sendMails) {
      tabs.push("Mails");
    }
    if (role.managePayment) {
      tabs.push("Payments");
    }

    return tabs;
  }, [role]);

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
            {(role.admin || role.editProject) && (
              <Tab.Panel>
                <ProjectSettings />
              </Tab.Panel>
            )}
            {(role.admin || role.editMember || role.deleteMember || role.inviteMember) && (
              <Tab.Panel>
                <ProjectMembers />
              </Tab.Panel>
            )}
            {(role.admin || role.manageRoles) && (
              <Tab.Panel>
                <ProjectRoles />
              </Tab.Panel>
            )}
            {(role.admin || role.manageExpenses) && (
              <Tab.Panel>
                <ProjectExpenses />
              </Tab.Panel>
            )}
            {(role.admin || role.sendMails) && (
              <Tab.Panel>
                <SendMails />
              </Tab.Panel>
            )}
            {(role.admin || role.managePayment) && (
              <Tab.Panel>
                <ProjectPayments />
              </Tab.Panel>
            )}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
