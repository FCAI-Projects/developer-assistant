import { useMutation } from "@apollo/client";
import axios from "axios";
import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { Button } from "../../components/Button";
import { InviteMemberModal } from "../../components/modals/InviteMemberModal";
import { UpdateMemberModel } from "../../components/modals/UpdateMemberModel";
import { RemoveMemberDocument, useMembersByProjectQuery } from "../../graphql/generated/graphql";
import { roleState } from "../../recoil";

export const ProjectMembers: React.FC = () => {
  const role = useRecoilValue(roleState);
  const params = useParams();
  const { data: members, refetch } = useMembersByProjectQuery({ variables: { projectId: params.id as string } });
  const [removeMember, { loading: loadingRemove }] = useMutation(RemoveMemberDocument);

  const handleDelete = async (id: string | null | undefined) => {
    await removeMember({
      variables: {
        removeMemberId: id,
      },
    });
    refetch();
  };

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Members</h2>
        {(role.admin || role.inviteMember) && <InviteMemberModal />}
      </header>
      {members &&
        members.membersByProject.map((member) => (
          <div key={member.id} className="relative flex items-center gap-3 border-b border-slate-200 py-5">
            <div>
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={axios.defaults.baseURL + "/uploads/avatars/" + member.user?.avatar}
                alt="avatar"
              />
            </div>
            <div>
              <h4 className="text-xl font-medium">{member.user?.fname + " " + member.user?.lname}</h4>
              <p>{member.role?.name}</p>
            </div>
            <div className="absolute right-0 flex gap-2">
              {(role.admin || role.editMember) && (
                <UpdateMemberModel
                  memberId={member.id}
                  roleId={member.role?.id}
                  roleName={member.role?.name}
                  refetch={refetch}
                />
              )}
              {(role.admin || role.deleteMember) && (
                <Button 
                  lightRed 
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure delete member?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it !'
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        await handleDelete(member.id);
                        Swal.fire(
                          'Deleted!',
                          'Member has been deleted.',
                          'success'
                        )
                      }
                    })
                  }} 
                  className="psy-3 px-4" loading={loadingRemove}>
                  <FaTrash />
                </Button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
