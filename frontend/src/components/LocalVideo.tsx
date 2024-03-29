import React, { forwardRef } from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  numberMember: number;
}

export const LocalVideo = forwardRef<any, VideoProps>((props, ref) => {
  // it causes echoing local video voice even if we past mute prop to video element.
  // useCalculateVoiceVolume(ref?.current?.srcObject, 'local');

  return (
    <div className="">
      {/* <VoiceVisualizer id="local" /> */}
      <video {...props} ref={ref}  className={props.numberMember > 0 ? "h-full w-full" : ""}  style={props.numberMember == 0 ?{
        height: "90vh",
        width: "100%"
      } : {
        maxWidth: "100%",
    height: "auto",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)"
      }}/>
    </div>
  );
});