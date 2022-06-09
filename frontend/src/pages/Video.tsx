import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { LocalVideo } from "../components/LocalVideo";
import { RemoteVideo } from "../components/RemoteVideo";
import { VideoControls } from "../components/VideoControls";
import { useCalculateVideoLayout } from "../hooks/useCalculateVideoLayout";
import { useCreateMediaStream } from "../hooks/useCreateMediaStream";
import { useStartPeerSession } from "../hooks/useStartPeerSession";
import { toggleFullscreen } from "../utils/toggleFullscreen";

export const Video: React.FC = () => {
  const { group } = useParams();
  const localVideoRef = useRef();
  const mainRef = useRef();
  const gridRef = useRef<any>();

  const userMediaStream = useCreateMediaStream(localVideoRef);

  const { connectedUsers, cancelScreenSharing, isScreenShared, shareScreen } = useStartPeerSession(
    group,
    userMediaStream,
    localVideoRef
  );

  useCalculateVideoLayout(gridRef, connectedUsers.length + 1);

  async function handleScreenSharing(share: boolean) {
    if (share) {
      await shareScreen();
    } else {
      await cancelScreenSharing();
    }
  }

  function handleFullscreen(fullscreen: boolean) {
    toggleFullscreen(fullscreen, mainRef.current);
  }

  return (
    <div className="bg-slate-700">
      <div ref={gridRef}>
        <LocalVideo ref={localVideoRef} autoPlay playsInline muted />
        {connectedUsers.map((user: any) => (
          <RemoteVideo key={user} id={user} autoPlay playsInline />
        ))}
      </div>
      <VideoControls
        isScreenShared={isScreenShared}
        onScreenShare={handleScreenSharing}
        onToggleFullscreen={handleFullscreen}
      />
    </div>
  );
};
