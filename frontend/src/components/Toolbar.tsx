import React from "react";
import { FaCogs, FaDoorOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Breadcrumb } from "./Breadcrumb";
import { Button } from "./Button";
import { InviteMemberModal } from "./modals/InviteMemberModal";
import { NewProjectModal } from "./modals/NewProjectModal";
import { NewTaskModal } from "./modals/NewTaskModal";

interface IProps {
  newProjectModal?: boolean;
  newTaskModal?: boolean;
  inviteMemberModal?: boolean;
  projectSettings?: boolean;
  logoutButton?: boolean;
}

export const Toolbar: React.FC<IProps> = ({
  newProjectModal,
  newTaskModal,
  inviteMemberModal,
  projectSettings,
  logoutButton,
}) => {
  return (
    <div className="flex items-center justify-between border-b p-2.5">
      <div>
        <Breadcrumb list={[{ name: "Home", link: "/app" }]} />
      </div>
      <div className="flex items-center gap-2">
        {newProjectModal && <NewProjectModal />}
        {projectSettings && (
          <Link to="settings">
            <Button lightBlue className="flex items-center gap-2 px-3 py-2 text-xs">
              <FaCogs /> Settings
            </Button>
          </Link>
        )}
        {newTaskModal && <NewTaskModal />}
        {inviteMemberModal && <InviteMemberModal />}
        {logoutButton && (
          <Button lightRed className="flex items-center gap-2 px-3 py-2 text-xs">
            <FaDoorOpen /> Logout
          </Button>
        )}
      </div>
    </div>
  );
};
