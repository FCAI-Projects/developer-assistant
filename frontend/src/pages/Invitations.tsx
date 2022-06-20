import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "../components/Button";
import {
  InvitationsDocument,
  RemoveMemberDocument,
  UpdateMemberDocument,
  useInvitationsQuery,
} from "../graphql/generated/graphql";

export const Invitations: React.FC = () => {
  const { data } = useInvitationsQuery();
  const [updateMember, { loading: loadingUpdate }] = useMutation(UpdateMemberDocument, {
    refetchQueries: [{ query: InvitationsDocument }],
  });
  const [removeMember, { loading: loadingRemove }] = useMutation(RemoveMemberDocument, {
    refetchQueries: [{ query: InvitationsDocument }],
  });

  const handleAccept = (id: string | null | undefined) => {
    updateMember({
      variables: {
        updateMemberId: id,
        updateMemberInput: {
          status: "joined",
        },
      },
    });
  };

  const handleDecline = (id: string | null | undefined) => {
    removeMember({
      variables: {
        removeMemberId: id,
      },
    });
  };

  return (
    <div className="container mx-auto my-5">
      <h2 className="text-2xl font-bold">Invitations</h2>
      <div className="flex flex-col gap-3">
        {data &&
          data.invitations.map((invitation) => {
            return (
              <div key={invitation.id} className="flex items-center justify-between border-b p-3">
                <div>
                  <h4 className="text-xl font-medium">{invitation.project?.name}</h4>
                </div>
                <div className="flex gap-2">
                  <Button lightGreen onClick={() => handleAccept(invitation.id)} loading={loadingUpdate}>
                    Accept
                  </Button>
                  <Button
                    lightRed
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure Decline invitations ?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Decline it !",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          try {
                            await handleDecline(invitation.id);
                            Swal.fire("Decline!", "Invitation has been Decline.", "success");
                          } catch (error: any) {
                            toast.error(error.message);
                          }
                        }
                      });
                    }}
                    loading={loadingRemove}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
