import React, { useEffect } from "react";
import { CgFontSpacing } from "react-icons/cg";
import { Outlet, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Statusbar } from "../components/Statusbar";
import { Toolbar } from "../components/Toolbar";
import { useMemberInfoQuery } from "../graphql/generated/graphql";
import { roleState } from "../recoil";

export const ProjectLayout: React.FC = () => {
  const [role, setRoleState] = useRecoilState(roleState);
  const params = useParams();
  const { data } = useMemberInfoQuery({ variables: { project: params.id as string } });

  useEffect(() => {
    if (data) {
      if (data.memberInfo.role) setRoleState(data.memberInfo.role);
      else setRoleState({ admin: true });
    }
  }, [data]);

  return (
    <>
      <div className="mx-5 pb-12">
        <Toolbar
          logoutButton={true}
          newListModel={role.admin || role.createList}
          inviteMemberModal={role.admin || role.inviteMember}
          projectSettings={
            role.admin ||
            role.editProject ||
            role.manageExpenses ||
            role.managePayment ||
            role.manageRoles ||
            role.sendMails ||
            role.inviteMember ||
            role.editMember ||
            role.deleteMember
          }
        />
        <Outlet />
      </div>
      <Statusbar />
    </>
  );
};
