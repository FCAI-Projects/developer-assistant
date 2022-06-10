import { useEffect, useState } from "react";
import { VedioControl } from "../pages/Video";

export const useCreateMediaStream = (localVideoRef: any, vedioControl: VedioControl) => {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const createMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: vedioControl.video? true :  {
          width: { min: 640, ideal: 1920 },
          height: { min: 400, ideal: 1080 },
          aspectRatio: { ideal: 1.7777777778 },
        }, audio: vedioControl.audio
      });

      localVideoRef.current.srcObject = stream;

      setUserMediaStream(stream);
    };

    createMediaStream();
  }, [localVideoRef]);

  return userMediaStream;
};
