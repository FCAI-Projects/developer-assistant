import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../../components/Button";
import { InviteMemberModal } from "../../components/modals/InviteMemberModal";

export const ProjectMembers: React.FC = () => {
  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Members</h2>
        <InviteMemberModal />
      </header>
      <div className="relative flex items-center gap-3 border-b border-slate-100 py-5">
        <div>
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="avatar"
          />
        </div>
        <div>
          <h4 className="text-xl font-medium">John Doe</h4>
          <p>Member</p>
        </div>
        <div className="absolute right-0 flex gap-2">
          <Button lightYellow className="px-4 py-3">
            <FaEdit />
          </Button>
          <Button lightRed className="px-4 py-3">
            <FaTrash />
          </Button>
        </div>
      </div>
      {/** */}
      <div className="relative flex items-center gap-3 border-b border-slate-100 py-5">
        <div>
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="avatar"
          />
        </div>
        <div>
          <h4 className="text-xl font-medium">John Doe</h4>
          <p>Member</p>
        </div>
        <div className="absolute right-0 flex gap-2">
          <Button lightYellow className="px-4 py-3">
            <FaEdit />
          </Button>
          <Button lightRed className="px-4 py-3">
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};
