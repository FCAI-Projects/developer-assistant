import { useMutation } from "@apollo/client";
import React from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { NewRoleModel } from "../../components/modals/NewRoleModel";
import { RemoveRoleDocument, RolesDocument, useRolesQuery } from "../../graphql/generated/graphql";

export const ProjectRoles: React.FC = () => {
  const projectId = useParams();
  const { data, error } = useRolesQuery({variables: {project: projectId.id as string}});
  
  const [deleteRole, { loading }] = useMutation(RemoveRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: projectId.id } }],
  });

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Roles</h2>
        <NewRoleModel />
      </header>
      {data && data.roles.map((role) => {
        return(
          <div className="relative flex items-center gap-3 border-b border-slate-200 py-5" key={role.id}>
            <div>
              <h4 className="text-xl font-medium">{role.roleName}</h4>
            </div>
            <div className="absolute right-0 flex gap-2">
              <Button lightYellow className="px-3 py-3 text-xs">
                <FaEdit />
              </Button>
              <Button 
                lightRed 
                className="px-3 py-3 text-xs"
                onClick={() => {
                  deleteRole({ 
                    variables: { 
                      removeRoleId: role.id 
                    } 
                  });
                }}
                disabled={loading}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  );
};