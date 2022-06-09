import { useEffect, useMemo, useState } from "react";
import { createPeerConnectionContext } from "../utils/PeerConnectionSession";

export const useStartPeerSession = (
  room: string | undefined,
  userMediaStream: MediaStream | null,
  localVideoRef: any
) => {
  const peerVideoConnection = useMemo(() => createPeerConnectionContext(), []);

  const [displayMediaStream, setDisplayMediaStream] = useState<MediaStream | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<any>([]);

  useEffect(() => {
    if (userMediaStream) {
      peerVideoConnection.joinRoom(room);
      peerVideoConnection.onAddUser((user: any) => {
        setConnectedUsers((users: any) => [...users, user]);
        peerVideoConnection.addPeerConnection(`${user}`, userMediaStream, (_stream: any) => {
          const el: any = document.getElementById(user);
          el.srcObject = _stream;
        });
        peerVideoConnection.callUser(user);
      });

      peerVideoConnection.onRemoveUser((socketId: any) => {
        setConnectedUsers((users: any) => users.filter((user: any) => user !== socketId));
        peerVideoConnection.removePeerConnection(socketId);
      });

      peerVideoConnection.onUpdateUserList(async (users: any) => {
        setConnectedUsers(users);
        for (const user of users) {
          peerVideoConnection.addPeerConnection(`${user}`, userMediaStream, (_stream: any) => {
            const el: any = document.getElementById(user);
            el.srcObject = _stream;
          });
        }
      });

      peerVideoConnection.onAnswerMade((socket: any) => peerVideoConnection.callUser(socket));
    }

    return () => {
      if (userMediaStream) {
        peerVideoConnection.clearConnections();
        userMediaStream?.getTracks()?.forEach((track) => track.stop());
      }
    };
  }, [peerVideoConnection, room, userMediaStream]);

  const cancelScreenSharing = async () => {
    const senders = await peerVideoConnection.senders.filter((sender: any) => sender.track.kind === "video");

    if (senders) {
      senders.forEach((sender: any) =>
        sender.replaceTrack(userMediaStream?.getTracks().find((track) => track.kind === "video"))
      );
    }

    localVideoRef.current.srcObject = userMediaStream;
    displayMediaStream?.getTracks().forEach((track) => track.stop());
    setDisplayMediaStream(null);
  };

  const shareScreen = async () => {
    const stream = displayMediaStream || (await navigator.mediaDevices.getDisplayMedia());

    const senders = await peerVideoConnection.senders.filter((sender: any) => sender.track.kind === "video");

    if (senders) {
      senders.forEach((sender: any) => sender.replaceTrack(stream.getTracks()[0]));
    }

    stream.getVideoTracks()[0].addEventListener("ended", () => {
      cancelScreenSharing();
    });

    localVideoRef.current.srcObject = stream;

    setDisplayMediaStream(stream);
  };

  return {
    connectedUsers,
    peerVideoConnection,
    shareScreen,
    cancelScreenSharing,
    isScreenShared: !!displayMediaStream,
  };
};
