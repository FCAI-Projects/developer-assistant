import React from "react";
import { useRecoilValue } from "recoil";
import { roleState } from "../../recoil";
import { Button } from "../Button";
import { SetDeadlineModel } from "../modals/SetDeadlineModel";
import { SetStartTaskDateModel } from "../modals/SetStartTaskDateModel";

interface StartDateProps {
  handleUpdateTask: (field: string, value: string) => void;
  startDate: string;
}

export const StartDate: React.FC<StartDateProps> = ({ handleUpdateTask, startDate }) => {
  const role = useRecoilValue(roleState);
  const getLeftTime = () => {
    if (new Date(startDate).getTime() > new Date().getTime()) {
      const ms = new Date(startDate).getTime() - new Date().getTime();
      const days = Math.floor(ms / (24 * 60 * 60 * 1000));
      const daysms = ms % (24 * 60 * 60 * 1000);
      const hours = Math.floor(daysms / (60 * 60 * 1000));
      const hoursms = ms % (60 * 60 * 1000);
      const minutes = Math.floor(hoursms / (60 * 1000));
      const minutesms = ms % (60 * 1000);
      const sec = Math.floor(minutesms / 1000);
      return (
        <span className="text-yellow-600">
          [Task will start in {days} Days, {hours} Hour, and {minutes} Minutes]
        </span>
      );
    } else {
      const ms = new Date().getTime() - new Date(startDate).getTime();
      const days = Math.floor(ms / (24 * 60 * 60 * 1000));
      const daysms = ms % (24 * 60 * 60 * 1000);
      const hours = Math.floor(daysms / (60 * 60 * 1000));
      const hoursms = ms % (60 * 60 * 1000);
      const minutes = Math.floor(hoursms / (60 * 1000));
      const minutesms = ms % (60 * 1000);
      const sec = Math.floor(minutesms / 1000);
      return (
        <span className="text-green-600">
          [task Started {days} Days, {hours} Hour, and {minutes} Minutes ago]
        </span>
      );
    }
  };

  return (
    <>
      {startDate && (
        <div className="flex flex-col gap-5 rounded-lg bg-slate-900 p-3 text-white">
          <p>
            Task Start at <span className="font-medium">{new Date(startDate).toLocaleString()}</span> {getLeftTime()}
          </p>
        </div>
      )}
      {(role.admin || role.editTask) && (
        <SetStartTaskDateModel handleUpdateTask={handleUpdateTask} deadline={startDate} />
      )}
    </>
  );
};
