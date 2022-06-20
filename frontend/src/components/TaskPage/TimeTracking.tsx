import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  StartTimeTrackingDocument,
  StopTimeTrackingDocument,
  useTaskUserTimeTrackingQuery,
} from "../../graphql/generated/graphql";
import { Button } from "../Button";
import { Loader } from "../Loader";

interface TimeTrackingProps {
  taskId: string;
}

export const TimeTracking: React.FC<TimeTrackingProps> = ({ taskId }) => {
  const {
    data: timaTrackingData,
    refetch,
    loading,
  } = useTaskUserTimeTrackingQuery({
    variables: {
      task: taskId,
    },
  });
  const [startTimeTracking, { loading: StartLoading }] = useMutation(StartTimeTrackingDocument);
  const [stopTimeTracking, { loading: stopLoading }] = useMutation(StopTimeTrackingDocument);
  const [duration, setDuration] = useState(0);

  const handleStart = async () => {
    await startTimeTracking({
      variables: {
        task: taskId,
      },
    });
    refetch();
  };

  const handleStop = async () => {
    await stopTimeTracking({
      variables: {
        task: taskId,
      },
    });
    refetch();
  };

  const millisToMinutesAndSeconds = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const MinutesToHoursDisplay = (a: number) => {
    var hours = Math.trunc(a / 60);
    var minutes = a % 60;
    return `You spend ${hours} hour and ${minutes} minute until NOW`;
  };

  useEffect(() => {
    if (timaTrackingData?.taskUserTimeTracking?.start)
      setInterval(
        () =>
          setDuration(
            Math.abs(new Date().getTime() - new Date(timaTrackingData?.taskUserTimeTracking?.start).getTime())
          ),
        1000
      );
  }, [timaTrackingData?.taskUserTimeTracking?.start]);

  useEffect(() => {
    if (timaTrackingData?.taskUserTimeTracking?.start)
      setDuration(Math.abs(new Date().getTime() - new Date(timaTrackingData?.taskUserTimeTracking?.start).getTime()));
  }, [timaTrackingData?.taskUserTimeTracking]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-5">
        {timaTrackingData?.taskUserTimeTracking?.start ? (
          <>
            <Button lightYellow className="flex items-center gap-2" onClick={handleStop} loading={stopLoading}>
              <FaPause />
              Stop Tracking
            </Button>
            <span className="text-xl font-medium">{millisToMinutesAndSeconds(duration)}</span>
          </>
        ) : (
          <>
            <Button lightBlue className="flex items-center gap-2" onClick={handleStart} loading={StartLoading}>
              <FaPlay />
              Start Tracking
            </Button>
            <span>
              {timaTrackingData?.taskUserTimeTracking?.duration &&
                MinutesToHoursDisplay(parseInt(timaTrackingData?.taskUserTimeTracking?.duration, 10))}
            </span>
          </>
        )}
      </div>
    </>
  );
};
