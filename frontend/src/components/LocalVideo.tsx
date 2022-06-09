import React, { forwardRef } from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

export const LocalVideo = forwardRef<any, VideoProps>((props, ref) => {
  // it causes echoing local video voice even if we past mute prop to video element.
  // useCalculateVoiceVolume(ref?.current?.srcObject, 'local');

  return (
    <div className="">
      {/* <VoiceVisualizer id="local" /> */}
      <video {...props} ref={ref} className="h-full w-full" />
    </div>
  );
});
