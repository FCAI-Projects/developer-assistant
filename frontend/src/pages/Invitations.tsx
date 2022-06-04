import React from "react";
import { Button } from "../components/Button";

export const Invitations: React.FC = () => {
  return (
    <div className="container mx-auto my-5">
      <h2 className="text-2xl font-bold">Invitations</h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b p-3">
          <div>
            <h4 className="text-lg">Project Name 1</h4>
          </div>
          <div className="flex gap-2">
            <Button lightGreen>Accept</Button>
            <Button lightRed>Decline</Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b p-3">
          <div>
            <h4 className="text-lg">Project Name 2</h4>
          </div>
          <div className="flex gap-2">
            <Button lightGreen>Accept</Button>
            <Button lightRed>Decline</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
