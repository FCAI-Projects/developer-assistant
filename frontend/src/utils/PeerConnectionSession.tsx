import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import socketIOClient from "socket.io-client";
import { authState } from "../recoil";

const { RTCPeerConnection, RTCSessionDescription } = window;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class PeerConnectionSession {
  _onConnected: any;
  _onDisconnected: any;
  _room: any;
  peerConnections: any = {};
  senders: any = [];
  listeners: any = {};
  socket: any;
  userId: string;

  constructor(socket: any) {
    const decoded: any = decodeToken(localStorage.getItem("token") || "");
    this.userId = decoded._id;

    this.socket = socket;
    this.onCallMade();
  }

  addPeerConnection(id: any, stream: any, callback: any) {
    this.peerConnections[id] = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach((track: any) => {
      this.senders.push(this.peerConnections[id].addTrack(track, stream));
    });

    this.listeners[id] = (event: any) => {
      const variableName = capitalizeFirstLetter(this.peerConnections[id].connectionState);
      let fn;

      if (variableName === "Connected") {
        fn = this._onConnected;
      } else if (variableName === "Disconnected") {
        fn = this._onDisconnected;
      }

      fn && fn(event, id);
    };

    this.peerConnections[id].addEventListener("connectionstatechange", this.listeners[id]);

    this.peerConnections[id].ontrack = function ({ streams: [stream] }: any) {
      callback(stream);
    };
  }

  removePeerConnection(id: any) {
    this.peerConnections[id].removeEventListener("connectionstatechange", this.listeners[id]);
    delete this.peerConnections[id];
    delete this.listeners[id];
  }

  isAlreadyCalling = false;

  async callUser(to: any) {
    if (this.peerConnections[to].iceConnectionState === "new") {
      const offer = await this.peerConnections[to].createOffer();
      await this.peerConnections[to].setLocalDescription(new RTCSessionDescription(offer));

      this.socket.emit("call-user", { offer, to });
    }
  }

  onConnected(callback: any) {
    this._onConnected = callback;
  }

  onDisconnected(callback: any) {
    this._onDisconnected = callback;
  }

  joinRoom(room: any) {
    this._room = room;
    this.socket.on(`room-not-found`, ({ users, current }: any) => {
      toast("Your are not a member", {
        type: "error",
      });
    });
    this.socket.emit("joinRoom", { room, userId: this.userId });
  }

  onCallMade() {
    this.socket.on("call-made", async (data: any) => {
      await this.peerConnections[data.socket].setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await this.peerConnections[data.socket].createAnswer();
      await this.peerConnections[data.socket].setLocalDescription(new RTCSessionDescription(answer));

      this.socket.emit("make-answer", {
        answer,
        to: data.socket,
      });
    });
  }

  onAddUser(callback: any) {
    this.socket.on(`${this._room}-add-user`, async ({ user }: any) => {
      callback(user);
    });
  }

  onRemoveUser(callback: any) {
    this.socket.on(`${this._room}-remove-user`, ({ socketId }: any) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback: any) {
    this.socket.on(`${this._room}-update-user-list`, ({ users, current }: any) => {
      callback(users, current);
    });
  }

  onAnswerMade(callback: any) {
    this.socket.on("answer-made", async (data: any) => {
      await this.peerConnections[data.socket].setRemoteDescription(new RTCSessionDescription(data.answer));
      callback(data.socket);
    });
  }

  clearConnections() {
    this.socket.close();
    this.senders = [];
    Object.keys(this.peerConnections).forEach(this.removePeerConnection.bind(this));
  }
}

export const createPeerConnectionContext = () => {
  const socket = socketIOClient("http://localhost:3030/video", {});

  return new PeerConnectionSession(socket);
};
