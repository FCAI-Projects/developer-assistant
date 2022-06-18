import React from "react";
import { useRecoilValue } from "recoil";
import { roleState } from "../../recoil";
import { Button } from "../Button";
import { SetDeadlineModel } from "../modals/SetDeadlineModel";

interface DeadlineProps {
  handleUpdateTask: (field: string, value: string) => void;
  deadline: string;
}

export const Deadline: React.FC<DeadlineProps> = ({ handleUpdateTask, deadline }) => {
  const role = useRecoilValue(roleState);
  const getLeftTime = () => {
    if (new Date(deadline).getTime() > new Date().getTime()) {
      const ms = new Date(deadline).getTime() - new Date().getTime();
      const days = Math.floor(ms / (24 * 60 * 60 * 1000));
      const daysms = ms % (24 * 60 * 60 * 1000);
      const hours = Math.floor(daysms / (60 * 60 * 1000));
      const hoursms = ms % (60 * 60 * 1000);
      const minutes = Math.floor(hoursms / (60 * 1000));
      const minutesms = ms % (60 * 1000);
      const sec = Math.floor(minutesms / 1000);
      return (
        <span className="text-green-600">
          [left {days} Days, {hours} Hour, and {minutes} Minutes]
        </span>
      );
    } else {
      const ms = new Date().getTime() - new Date(deadline).getTime();
      const days = Math.floor(ms / (24 * 60 * 60 * 1000));
      const daysms = ms % (24 * 60 * 60 * 1000);
      const hours = Math.floor(daysms / (60 * 60 * 1000));
      const hoursms = ms % (60 * 60 * 1000);
      const minutes = Math.floor(hoursms / (60 * 1000));
      const minutesms = ms % (60 * 1000);
      const sec = Math.floor(minutesms / 1000);
      return (
        <span className="text-red-600">
          [Times out {days} Days, {hours} Hour, and {minutes} Minutes ago]
        </span>
      );
    }
  };

  return (
    <>
      {deadline && (
        <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
          <p>
            Deadline is <span className="font-medium">{new Date(deadline).toLocaleString()}</span> {getLeftTime()}
          </p>
        </div>
      )}
      {(role.admin || role.editTask) && <SetDeadlineModel handleUpdateTask={handleUpdateTask} deadline={deadline} />}
    </>
  );
};
