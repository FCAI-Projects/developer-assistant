import React from "react";
import { Button } from "../Button";

interface DeadlineProps {}

export const Deadline: React.FC<DeadlineProps> = () => {
  return (
    <>
      <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
        <p>
          Deadline is <span className="font-medium">3/7/2022</span>{" "}
          <span className="text-green-600">[left 3 Days, 17 Hour, and 7 Minutes]</span>
        </p>
      </div>
      <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
        <p>
          Deadline is <span className="font-medium">3/7/2022</span>{" "}
          <span className="text-yellow-600">[left 3 Days, 17 Hour, and 7 Minutes]</span>
        </p>
      </div>
      <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
        <p>
          Deadline is <span className="font-medium">3/7/2022</span>{" "}
          <span className="text-red-600">[Times out 17 Hour, and 7 Minutes ago]</span>
        </p>
      </div>
      <Button light>Set/Update Deadline</Button>
    </>
  );
};
