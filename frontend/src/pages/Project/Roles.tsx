import React from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "../../components/Button";
import { NewRoleModel } from "../../components/modals/NewRoleModel";

export const ProjectRoles: React.FC = () => {
  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Roles</h2>
        <NewRoleModel />
      </header>
      <div className="relative flex items-center gap-3 border-b border-slate-200 py-5">
        <div>
          <h4 className="text-xl font-medium">Custom Role</h4>
        </div>
        <div className="absolute right-0 flex gap-2">
          <Button lightYellow className="px-3 py-3 text-xs">
            <FaEdit />
          </Button>
          <Button lightRed className="px-3 py-3 text-xs">
            <FaTrash />
          </Button>
        </div>
      </div>
      {/** */}
      <div className="relative flex items-center gap-3 border-b border-slate-200 py-5">
        <div>
          <h4 className="text-xl font-medium">Custom Role</h4>
        </div>
        <div className="absolute right-0 flex gap-2">
          <Button lightYellow className="px-3 py-3 text-xs">
            <FaEdit />
          </Button>
          <Button lightRed className="px-3 py-3 text-xs">
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};
