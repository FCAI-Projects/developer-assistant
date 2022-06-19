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
      {data.map((pull: any) => (
        <div key={pull.id} className="mb-3 flex items-center justify-between border-b py-3">
          <h4 className="text-xl">
            By <span className="font-medium">{pull.user.login}</span>
          </h4>
          <div className="flex items-center gap-2">
            <a href={pull.html_url} target="_blank" className="text-blue-600 underline">
              Go to Github
            </a>
            <Button green>Merge</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
