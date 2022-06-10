import React, { useState } from "react";
import { Button } from "./Button";
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { MdPresentToAll } from "react-icons/md";
interface VideoControlsProps {
  isScreenShared: boolean;
  toggleAudio: (audio: boolean) => void;
  togglevideo: (video: boolean) => void;
  audio: boolean;
  video: boolean;
  onScreenShare: (value: boolean) => void;
  onToggleFullscreen: (value: boolean) => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({ isScreenShared, onScreenShare, onToggleFullscreen, audio, video, toggleAudio, togglevideo }) => {
  const [isFullscreen, setFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    const value = !isFullscreen;
    setFullscreen(value);
    onToggleFullscreen(value);
  };

  const handleScreenShare = () => {
    onScreenShare(!isScreenShared);
  };

  return (
    // replace with styled component
    <div className="fixed bottom-10 right-0 left-0 text-center">
      <div className="inline-flex gap-3">
      
     
      <IconVedio vedio  active={video} onClick={() => {togglevideo(!video)}}/>
      <IconVedio audio active={audio} onClick={() => {toggleAudio(!audio)}}/>
      <IconVedio onClick={handleScreenShare} screenSharing active={isScreenShared}/>
        {/* <Button onClick={handleScreenShare}>{isScreenShared ? "Cancel Sharing" : "Share Screen"}</Button>
        <Button onClick={handleToggleFullscreen}>{isFullscreen ? "Exit Full Screen" : "Full Screen"}</Button> */}
      </div>
    </div>
  );
};

interface IconProps {
  vedio?: boolean;
  audio?: boolean;
  screenSharing?: boolean;
  active: boolean;
  onClick: () => void;
}


const IconVedio: React.FC<IconProps> = (props) => {
  let icon = props.active? <BiVideo onClick={props.onClick} className="bg-gray-700 p-2.5 text-white w-11 h-11 rounded-full hover:cursor-pointer" /> : <BiVideoOff onClick={props.onClick} className="bg-red-600 p-2.5 text-white w-11 h-11 rounded-full hover:cursor-pointer" />;
  if(props.audio) {
    icon = props.active? <BiMicrophone onClick={props.onClick} className="bg-gray-700 p-2.5 text-white w-11 h-11 rounded-full hover:cursor-pointer" /> : <BiMicrophoneOff onClick={props.onClick} className="bg-red-600 p-2.5 text-white w-11 h-11 rounded-full hover:cursor-pointer" />;
  } else if(props.screenSharing) {
    icon = props.active? <MdPresentToAll onClick={props.onClick} className="bg-blue-900 p-2.5 text-white w-11 h-11 rounded-full hover:cursor-pointer" /> : <MdPresentToAll onClick={props.onClick} className="bg-gray-700 p-2.5 text-white w-11 h-11 rounded-full hover:cursor-pointer" />;
  }
  return(
    icon
  );
}