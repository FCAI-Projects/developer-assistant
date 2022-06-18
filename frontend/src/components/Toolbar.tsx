import React from "react";
import { FaCogs, FaDoorOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, roleState } from "../recoil";
import { Breadcrumb } from "./Breadcrumb";
import { Button } from "./Button";
import { InviteMemberModal } from "./modals/InviteMemberModal";
import { NewListModel } from "./modals/NewListModel";
import { NewProjectModal } from "./modals/NewProjectModal";
import { NewTaskModal } from "./modals/NewTaskModal";

interface IProps {
  newProjectModal?: boolean;
  newListModel?: boolean;
  inviteMemberModal?: boolean;
  projectSettings?: boolean;
  logoutButton?: boolean;
}

export const Toolbar: React.FC<IProps> = ({
  newProjectModal,
  newListModel,
  inviteMemberModal,
  projectSettings,
  logoutButton,
}) => {
  const setToken = useSetRecoilState(authState);
  const role = useRecoilValue(roleState);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

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
              <FaCogs /> Project Settings
            </Button>
          </Link>
        )}
        {newListModel && <NewListModel />}
        {inviteMemberModal && <InviteMemberModal />}
        {logoutButton && (
          <Button lightRed className="flex items-center gap-2 px-3 py-2 text-xs" onClick={handleLogout}>
            <FaDoorOpen /> Logout
          </Button>
        )}
      </div>
    </div>
  );
};
