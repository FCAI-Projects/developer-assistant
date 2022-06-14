import React from "react";
import { FaGreaterThanEqual } from "react-icons/fa";
import { AddPrivateNotesModel } from "../modals/AddPrivateNotesModel";

interface PrivateNoteProps {}

export const PrivateNote: React.FC<PrivateNoteProps> = () => {
  return (
    <div className="border-b pb-2">
      <header className="flex items-center justify-between mb-2">
        <h6 className="mb-1 flex items-center gap-2">
          <FaGreaterThanEqual className="text-sm" />
          Private Notes
        </h6>
        <AddPrivateNotesModel />
      </header>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis harum iste tempora nulla illo dolorem ut
        reiciendis doloremque asperiores maiores?
      </p>
    </div>
  );
};
