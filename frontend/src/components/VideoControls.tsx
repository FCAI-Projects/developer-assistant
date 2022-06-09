import React, { useState } from "react";
import { Button } from "./Button";

interface VideoControlsProps {
  isScreenShared: boolean;
  onScreenShare: (value: boolean) => void;
  onToggleFullscreen: (value: boolean) => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({ isScreenShared, onScreenShare, onToggleFullscreen }) => {
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
    <div className="fixed bottom-5 right-0 left-0 text-center">
      <div className="inline-flex gap-5">
        <Button onClick={handleScreenShare}>{isScreenShared ? "Cancel Sharing" : "Share Screen"}</Button>
        <Button onClick={handleToggleFullscreen}>{isFullscreen ? "Exit Full Screen" : "Full Screen"}</Button>
      </div>
    </div>
  );
};
