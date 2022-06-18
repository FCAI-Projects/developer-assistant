import { useMutation } from "@apollo/client";
import axios from "axios";
import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { InviteMemberModal } from "../../components/modals/InviteMemberModal";
import { UpdateMemberModel } from "../../components/modals/UpdateMemberModel";
import { RemoveMemberDocument, useMembersByProjectQuery } from "../../graphql/generated/graphql";
import { roleState } from "../../recoil";

export const ProjectPulls: React.FC = () => {
  const params = useParams();
  const { data, isLoading, isError } = useQuery("Get Pull Requests", async () => {
    const { data } = await axios.get(`/github/pulls/${params.id}`);
    return data;
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">GitHub Pull Requests</h2>
      </header>
      {isError && <div>Github is not enables</div>}
    </div>
  );
};
