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

export interface VedioControl {
  video: boolean;
    audio: boolean;
}

const createMediaStream = async (vedioControl :VedioControl ) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: vedioControl.video? true :  {
      width: { min: 640, ideal: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: { ideal: 1.7777777778 },
    }, audio: vedioControl.audio
  });

  return stream;

};

export const Video: React.FC = () => {
  const { group } = useParams();
  const localVideoRef: any = useRef();
  const mainRef = useRef();
  const gridRef = useRef<any>();
  const [vedioControl, setVedioControl] = useState<VedioControl>({
    video: false,
    audio: false,
  });

  let gridClass:string = "grid grid-cols-2 grid-flow-row gap-4 auto-cols-auto";


  const [userMediaStream, setUserMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    
    setVideoControl();
    
  }, [localVideoRef]);

  const setVideoControl = async () => {
    const stream = await createMediaStream(vedioControl);
    localVideoRef.current.srcObject = stream;
    setUserMediaStream(stream);
  }

  const { connectedUsers, cancelScreenSharing, isScreenShared, shareScreen, changeControlsVideo } = useStartPeerSession(
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

  // handle number of cols when multi users
  useEffect(() => {
   
    const numberConttection = (connectedUsers.length + 1) % 2 == 0? connectedUsers.length + 1 : connectedUsers.length + 2;
   
    gridClass = "grid grid-cols-" + (numberConttection / 2)  + " grid-flow-row gap-4 auto-cols-auto place-content-center";
  }
  , [connectedUsers]);

  useEffect(() => {
    changeControlVideo();
    
  }
  , [vedioControl]);

  const changeControlVideo = async () => {
    const stream = await createMediaStream(vedioControl);
    localVideoRef.current.srcObject = stream;
    changeControlsVideo(stream);
  }

  const toggleAudio = (audio: boolean) => {
    setVedioControl({ ...vedioControl, audio });
 
  }

    const toggleVideo = (video: boolean) => {
    setVedioControl({ ...vedioControl, video });
  }
  return (
    
    <div className="">
      
      <div ref={gridRef} className={connectedUsers.length > 0 ? gridClass : "grid gap-4 grid-flow-col auto-cols-auto"}>
        <LocalVideo numberMember={connectedUsers} ref={localVideoRef} autoPlay playsInline muted  className="h-screen" />
        {connectedUsers.map((user: any) => {return (
          <RemoteVideo key={user} id={user} autoPlay playsInline className=""/>
     
        );})}
         
      </div>
      <VideoControls
        toggleAudio={toggleAudio}
        togglevideo={toggleVideo}
        audio={vedioControl.audio}
        video={vedioControl.video}
        isScreenShared={isScreenShared}
        onScreenShare={handleScreenSharing}
        onToggleFullscreen={handleFullscreen}
      />
    </div>
  );
};
