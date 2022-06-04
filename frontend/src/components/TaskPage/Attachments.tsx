import React from "react";
import { FaUpload } from "react-icons/fa";

interface AttachmentsProps {}

export const Attachments: React.FC<AttachmentsProps> = () => {
  return (
    <div className="flex flex-col gap-2">
      <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
        Text File
        <span className="text-sm">14 MB</span>
      </button>
      <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
        Text File
        <span className="text-sm">14 MB</span>
      </button>
      <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
        Text File
        <span className="text-sm">14 MB</span>
      </button>
      <button className="flex items-center justify-between rounded-lg bg-slate-700 px-2 py-4 text-white">
        Text File
        <span className="text-sm">14 MB</span>
      </button>
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-300">
          <FaUpload />
          Upload File
        </button>
      </div>
    </div>
  );
};
