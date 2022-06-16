import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Statusbar } from "../components/Statusbar";
import { Toolbar } from "../components/Toolbar";
import { useMemberInfoQuery } from "../graphql/generated/graphql";
import { roleState } from "../recoil";

export const ProjectLayout: React.FC = () => {
  const setRoleState = useRecoilState(roleState);
  const params = useParams();
  const { data } = useMemberInfoQuery({ variables: { project: params.id as string } });

  useEffect(() => {
    console.log(params.id);
  }, [params]);
  console.log(data);

  return (
    <>
      <div className="mx-5 pb-12">
        <Toolbar logoutButton={true} newListModel={true} inviteMemberModal={true} projectSettings={true} />
        <Outlet />
      </div>
      <Statusbar />
    </>
  );
};
