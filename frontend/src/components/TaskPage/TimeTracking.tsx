import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { Button } from "../Button";

interface TimeTrackingProps {}

export const TimeTracking: React.FC<TimeTrackingProps> = () => {
  return (
    <>
      <div className="flex items-center gap-5">
        <Button lightBlue className="flex items-center gap-2">
          <FaPlay />
          Start Tracking
        </Button>
        <span>You spend 3 Hour and 40 Minutes Until Now</span>
      </div>
      <div className="flex items-center gap-5">
        <Button lightYellow className="flex items-center gap-2">
          <FaPause />
          Stop Tracking
        </Button>
        <span className="text-xl font-medium">03:33:39</span>
      </div>
    </>
  );
};
