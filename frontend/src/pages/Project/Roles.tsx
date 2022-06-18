import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { NewRoleModel } from "../../components/modals/NewRoleModel";
import { UpdateRoleModel } from "../../components/modals/UpdateRoleModel";
import { RemoveRoleDocument, RolesDocument, useRolesQuery } from "../../graphql/generated/graphql";

export const ProjectRoles: React.FC = () => {
  const params = useParams();
  const { data } = useRolesQuery({ variables: { project: params.id as string } });

  const [deleteRole, { loading }] = useMutation(RemoveRoleDocument, {
    refetchQueries: [{ query: RolesDocument, variables: { project: params.id } }],
  });

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Roles</h2>
        <NewRoleModel />
      </header>
      {data &&
        data.roles.map((role) => {
          return (
            <div className="relative flex items-center gap-3 border-b border-slate-200 py-5" key={role.id}>
              <div>
                <h4 className="text-xl font-medium">{role.name}</h4>
              </div>
              <div className="absolute right-0 flex gap-2">
                <UpdateRoleModel
                  id={role.id}
                  name={role.name}
                  createList={role.createList}
                  editList={role.editList}
                  deleteList={role.deleteList}
                  createTask={role.createTask}
                  deleteTask={role.deleteTask}
                  editTask={role.editTask}
                  assignTask={role.assignTask}
                  unAssignTask={role.unAssignTask}
                  editDocs={role.editDocs}
                  canComment={role.canComment}
                  editProject={role.editProject}
                  manageRoles={role.manageRoles}
                  manageExpenses={role.manageExpenses}
                  sendMails={role.sendMails}
                  managePayment={role.managePayment}
                  inviteMember={role.inviteMember}
                  deleteMember={role.deleteMember}
                  editMember={role.editMember}
                />
                <Button
                  lightRed
                  className="px-3 py-3 text-xs"
                  onClick={ async ()  =>  {
                    try {
                      await deleteRole({
                        variables: {
                          removeRoleId: role.id,
                        },
                      });
                      toast.success("Role Deleted");
                    } catch (error: any) {
                      toast.error(error.message);
                    }
                  }}
                  disabled={loading}
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
