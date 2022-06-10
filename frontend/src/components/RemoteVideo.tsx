import React, { useEffect, useState } from "react";
// import { useCalculateVoiceVolume } from '../../hooks';

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
}

export const RemoteVideo: React.FC<VideoProps> = ({ ...props }) => {
  const [mediaStream, setMediaStream] = useState();

  // useCalculateVoiceVolume(mediaStream, props.id);

  useEffect(() => {
    const interval = setInterval(() => {
      const video: any = document.getElementById(props.id);
      const stream = video.srcObject;

      if (stream) {
        setMediaStream(stream);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [props.id]);

  return (
    <div className="box-border">
      {/* <VoiceVisualizer id={props.id} /> */}
      <video {...props} style={{
           maxWidth: "100%",
           height: "auto",
           position: "relative",
           left: "50%",
           transform: "translateX(-50%)"
      }} />
    </div>
  );
};
