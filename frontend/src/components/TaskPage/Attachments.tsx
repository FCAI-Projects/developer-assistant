import { useMutation } from "@apollo/client";
import axios from "axios";
import React from "react";
import { FaUpload } from "react-icons/fa";
import { InputFiles } from "typescript";
import { UpdateTaskDocument, UploadAttachmentsDocument } from "../../graphql/generated/graphql";

interface AttachmentsProps {
  data: string[] | null | undefined;
  id: string;
  refetchTask: () => void;
}

export const Attachments: React.FC<AttachmentsProps> = ({ data, id, refetchTask }) => {
  const [upload, { error }] = useMutation(UploadAttachmentsDocument);

  const handleUploadFile = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    await upload({
      variables: {
        uploadAttachmentsId: id,
        attachment: file,
      },
    });
    refetchTask();
  };
  return (
    <div className="flex flex-col gap-2">
      {data &&
        data.map((item, index) => (
          <a
            href={axios.defaults.baseURL + "/uploads/attachemnts/" + item}
            target="_blank"
            className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white"
            key={index}
          >
            {item.length >= 25 ? item.slice(0, 25) + "..." : item}
            {/* <span className="text-sm">14 MB</span> */}
          </a>
        ))}
      <div className="flex justify-end">
        <label
          htmlFor="file"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-300"
        >
          <FaUpload />
          Upload File
        </label>
        <input type="file" id="file" className="hidden" onChange={handleUploadFile} />
      </div>
    </div>
  );
};
