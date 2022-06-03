import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Textarea } from "../../components/forms";
import { NewRoleModel } from "../../components/modals/NewRoleModel";
import { UpdateRoleModel } from "../../components/modals/UpdateRoleModel";
import { RemoveRoleDocument, RolesDocument, useRolesQuery } from "../../graphql/generated/graphql";

export const SendMails: React.FC = () => {
  const params = useParams();
  const { data } = useRolesQuery({ variables: { project: params.id as string } });

  const [deleteRole, { loading }] = useMutation(RemoveRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: params.id } }],
  });

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Send Email to Client</h2>
      </header>
      <main className="flex flex-col gap-3">
        <Textarea className="h-52 resize-none" />
        <div className="flex justify-end">
          <Button green>Send</Button>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-xl font-medium">Mail Templates</h4>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus provident, quas, voluptate in nemo ab
              aliquam tenetur similique asperiores culpa illo omnis voluptatem quis a doloribus sunt esse illum
              voluptates.
            </p>
          </div>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus provident, quas, voluptate in nemo ab
              aliquam tenetur similique asperiores culpa illo omnis voluptatem quis a doloribus sunt esse illum
              voluptates.
            </p>
          </div>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus provident, quas, voluptate in nemo ab
              aliquam tenetur similique asperiores culpa illo omnis voluptatem quis a doloribus sunt esse illum
              voluptates.
            </p>
          </div>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus provident, quas, voluptate in nemo ab
              aliquam tenetur similique asperiores culpa illo omnis voluptatem quis a doloribus sunt esse illum
              voluptates.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
