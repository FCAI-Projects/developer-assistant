
import { useMutation } from "@apollo/client";
import { Button } from "../components/Button";


import { UpdateMemberDocument, useInvitationsQuery } from "../graphql/generated/graphql";

export const Invitations: React.FC = () => {
  const { data, error, loading } = useInvitationsQuery();
  //  const { updateMember } = useMutation (UpdateMemberDocument);
  
  
  return (
    <div className="container mx-auto my-5">
      <h2 className="text-2xl font-bold">Invitations</h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b p-3">
       {data && data.invitations.map( (Invitations) => {
        return <div>
           <div>
            <h4 className="text-lg">{Invitations.project.name}</h4>
          </div>
          
          <Button lightGreen>Accept</Button>
            <Button lightRed >Decline</Button>
           </div>
       })}
       
        
        </div>
      </div>
    </div>
  );
};


