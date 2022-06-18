import React, { useEffect } from "react";
import { FaCogs, FaDoorOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
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
  const [links, setLinks] = React.useState<any[]>([{ name: "Home", link: "/app" }]);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const linksArr = path.split("/").filter((item) => item !== "" && item !== "app");
    const linksTemp = [{ name: "Home", link: "/app" }];
    linksArr.map((item, index) => {
      if (item === "project") {
        linksTemp.push({ name: "Project", link: `/app/project/${linksArr[index + 1]}` });
      } else if (item === "settings") {
        linksTemp.push({ name: "Settings", link: `/app/project/${linksArr[index - 1]}/settings` });
      } else if (item === "task") {
        linksTemp.push({ name: "Task", link: `/app/project/${linksArr[index - 1]}/task/${linksArr[index + 1]}` });
      }
    });
    setLinks(linksTemp);
  }, [path]);

  return (
    <div className="flex items-center justify-between border-b p-2.5">
      <div>
        <Breadcrumb list={links} />
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
