import React, { useEffect, useState } from "react";
import { FaAngleRight, FaTrash, FaVideo } from "react-icons/fa";
import socketIOClient from "socket.io-client";
import { GroupsDocument, RemoveGroupDocument, useGroupsQuery } from "../graphql/generated/graphql";
import { Loader } from "../components/Loader";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil";
import { decodeToken } from "react-jwt";
import { NewGroupModel } from "../components/modals/NewGroupModel";
import { Link } from "react-router-dom";
import { useRsaEncrypt } from "../hooks/useRsaEncrypt";
import { UpdateGroupModel } from "../components/modals/UpdateGroupModel";
import { Button } from "../components/Button";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const socket = socketIOClient("https://69aa-154-178-131-231.eu.ngrok.io");

export const Chat: React.FC = () => {
  const authToken = useRecoilValue(authState);
  const [id, setId] = useState("");
  const { encrypt } = useRsaEncrypt();
  const { data, loading } = useGroupsQuery();
  const [deleteGroup, { loading: DeleteLoding }] = useMutation(RemoveGroupDocument, {
    refetchQueries: [{ query: GroupsDocument }],
  });
  const [message, setMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

  const handelDeleteGroup = async (id: string) => {
    try {
      await deleteGroup({
        variables: {
          removeGroupId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    const data = {
      message: encrypt(message),
      group: selectedGroup.id,
      sender: id,
    };

    socket.emit("createMessage", data, (res: any) => {
      setMessages([...messages, res]);
      setMessage("");
    });
  };

  useEffect(() => {
    socket.on("message", (res: any) => {
      setMessages([...messages, res]);
    });
  });

  useEffect(() => {
    if (selectedGroup)
      socket.emit("findAllMessages", { group: selectedGroup.id }, (data: any) => {
        setMessages(data);
      });
  }, [selectedGroup]);

  useEffect(() => {
    if (authToken) {
      const decode: any = decodeToken(authToken);
      setId(decode._id);
    }
  }, [authToken]);

  if (loading) return <Loader />;

  return (
    <div className="">
      <div className="flex h-[90vh]">
        <div className="flex min-h-full w-2/12 flex-col border-r border-slate-300">
          <ul>
            {data?.groups.map((el) => (
              <li
                className={`cursor-pointer p-3 ${selectedGroup?.id === el.id ? "bg-slate-300" : ""}`}
                key={el.id}
                onClick={() => setSelectedGroup(el)}
              >
                {el.name}
              </li>
            ))}
          </ul>
          <NewGroupModel />
        </div>
        {selectedGroup ? (
          <div className="flex flex-1 flex-col">
            <header className="flex items-center justify-between border-b border-slate-300 p-3">
              <div className="flex flex-col">
                <h4 className="text-xl font-medium text-slate-800">{selectedGroup?.name}</h4>
                <p className="flex gap-1 text-xs text-slate-500">
                  <span className="">{selectedGroup?.admin.fname},</span>

                  {selectedGroup?.members.map((el: any, index: number) => (
                    <span key={index} className="">
                      {el.fname}
                      {index !== selectedGroup?.members.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <Link to={"/app/chat/video/" + selectedGroup.id} target="_blank">
                  <FaVideo className="cursor-pointer text-lg text-slate-700" />
                </Link>
                <UpdateGroupModel
                  groupId={selectedGroup.id}
                  name={selectedGroup.name}
                  projectInGroup={selectedGroup.project}
                  membersInGroup={selectedGroup.members}
                />
                <FaTrash
                  className="text-xlgl cursor-pointer text-slate-700"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure delete Group ?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it !",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          await handelDeleteGroup(selectedGroup.id);
                          Swal.fire("Deleted!", "Group has been deleted.", "success");
                        } catch (error: any) {
                          toast.error(error.message);
                        }
                      }
                    });
                  }}
                />
              </div>
            </header>
            <div className="mb-1 flex max-h-screen flex-col items-baseline gap-5 overflow-auto p-5 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-500">
              {messages.length === 0 && (
                <div className="flex h-full w-full items-center justify-center py-20">
                  <p className="text-xl text-slate-500">No messages yet</p>
                </div>
              )}
              {messages.map((el: any) => (
                <div
                  className={`inline-flex flex-col rounded-lg bg-slate-600 px-3 py-2 text-white ${
                    el.sender._id === id ? "self-end" : ""
                  }`}
                  key={el._id}
                >
                  <h6 className="text-xs text-slate-300">{el.sender.fname + " " + el.sender.lname}</h6>
                  <p>{el.message}</p>
                  <span className="self-end pt-1 text-xs text-slate-300">
                    {new Date(el.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-auto px-1">
              <textarea
                name="message"
                id="message"
                className="min-h-0 w-full resize-none rounded-lg border-none p-3 pr-20 focus:ring-0"
                placeholder="Type your message here..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              <button
                className={`absolute right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-slate-600 px-3 py-2 text-xl text-white ${
                  message === "" ? "hidden" : ""
                }`}
                onClick={sendMessage}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-xl text-slate-500">Welcome to Chat Page</p>
          </div>
        )}
      </div>
    </div>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
