import { useMutation } from "@apollo/client";
import { Button } from "../components/Button";
import { UpdateMemberDocument, useInvitationsQuery } from "../graphql/generated/graphql";

export const Invitations: React.FC = () => {
  const { data, error, loading } = useInvitationsQuery();
  const [updateMember, { loading: loadingUpdate} ] = useMutation (UpdateMemberDocument, {
    refetchQueries: ["Invitations"]
  });

  const handleAccept = (id: string) => {
    updateMember({
      variables: {  
        updateMemberId: id,
        updateMemberInput: {
          status: "joined" 
        }
      }
    });
  }
  const handleDecline = (id: string) => {
    updateMember({
      variables: {  
        updateMemberId: id,
        updateMemberInput: {
          status: "declined" 
        }
      }
    });
  }

  return (
    <div className="container mx-auto my-5">
      <h2 className="text-2xl font-bold">Invitations</h2>
      <div className="flex flex-col gap-3">
        {data && data.invitations.map((invitation) => {
          return (
            <div 
              key={invitation.id}
              className="flex items-center justify-between border-b p-3"
            >
              <div>
                <h4 className="text-lg">{invitation.user.fname+" "+invitation.user.lname}</h4>
              </div>
              <div className="flex gap-2">
                <Button 
                  lightGreen
                  onClick={() => handleAccept(invitation.id)}
                  loading={loadingUpdate}
                >
                  Accept
                </Button>
                <Button 
                  lightRed
                  onClick={() => handleDecline(invitation.id)}
                  loading={loadingUpdate}
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