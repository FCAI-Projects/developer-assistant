import React, { useEffect, useState } from "react";
import { FaAngleRight, FaPlus, FaVideo } from "react-icons/fa";
import { Button } from "../components/Button";
import socketIOClient from "socket.io-client";
import axios from "axios";

export const Chat: React.FC = () => {
  const [message, setMessages] = useState("");
  const [response, setResponse] = useState([]);

  const sendMessage = async () => {
    const data = {
      message: message,
      user: "user",
    };
    await axios.post("http://localhost:5000/api/chat", data);
    setMessages("");
  };

  useEffect(() => {
    const socket = socketIOClient(axios.defaults.baseURL || "");

    socket.on("findAllMessages", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <header className="my-5 flex items-center justify-between text-2xl">
        <h3 className="font-medium">Chat (5)</h3>
        <Button blue className="flex items-center gap-2">
          <FaPlus /> Create Group
        </Button>
      </header>
      <div className="flex overflow-hidden rounded-lg  bg-slate-200">
        <div className="w-2/12 border-r border-slate-300">
          <ul>
            <li className="cursor-pointer bg-slate-300 px-3 py-5">Chat 1</li>
            <li className="cursor-pointer p-3">Chat 2</li>
            <li className="cursor-pointer p-3">Chat 3</li>
          </ul>
        </div>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-300 p-3">
            <div className="flex flex-col">
              <h4 className="text-xl font-medium text-slate-800">Chat Name</h4>
              <p className="text-xs text-slate-500">Eslam Typing...</p>
            </div>
            <div>
              <FaVideo className="cursor-pointer text-xl text-slate-600" />
            </div>
          </header>
          <div className="flex max-h-screen flex-col items-baseline gap-5 overflow-auto p-5">
            <div className="inline-flex flex-col rounded-lg bg-slate-600 px-3 py-2 text-white">
              <h6 className="text-xs text-slate-300">Eslam Mohamde</h6>
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="self-end pt-1 text-xs text-slate-300">14:00 PM</span>
            </div>
            <div className="inline-flex flex-col rounded-lg bg-slate-600 px-3 py-2 text-white">
              <h6 className="text-xs text-slate-300">Eslam Mohamde</h6>
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="self-end pt-1 text-xs text-slate-300">14:00 PM</span>
            </div>
            <div className="inline-flex flex-col rounded-lg bg-slate-600 px-3 py-2 text-white">
              <h6 className="text-xs text-slate-300">Eslam Mohamde</h6>
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="self-end pt-1 text-xs text-slate-300">14:00 PM</span>
            </div>
            <div className="inline-flex flex-col rounded-lg bg-slate-600 px-3 py-2 text-white">
              <h6 className="text-xs text-slate-300">Eslam Mohamde</h6>
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="self-end pt-1 text-xs text-slate-300">14:00 PM</span>
            </div>
            <div className="inline-flex flex-col rounded-lg bg-slate-600 px-3 py-2 text-white">
              <h6 className="text-xs text-slate-300">Eslam Mohamde</h6>
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="self-end pt-1 text-xs text-slate-300">14:00 PM</span>
            </div>

            <div className="inline-flex flex-col self-end rounded-lg bg-slate-600 px-3 py-2 text-white">
              <p>Lorem ipsum dolor sit amet.</p>
              <span className="self-end pt-1 text-xs text-slate-300">14:00 PM</span>
            </div>
          </div>
          <div className="relative px-1">
            <textarea
              name="message"
              id="message"
              className="min-h-0 w-full resize-none rounded-lg border-none p-3 pr-20 focus:ring-0"
              placeholder="Type your message here..."
              onChange={(e) => setMessages(e.target.value)}
            >
              {message}
            </textarea>
            <button className="absolute right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-slate-600 px-3 py-2 text-xl text-white">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
