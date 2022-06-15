import React from "react";
import { FaGreaterThanEqual } from "react-icons/fa";
import { UpdateDocsModel } from "../modals/UpdateDocsModel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DocsProps {
  docs: string | null | undefined;
  handleUpdateTask: (field: string, value: string) => void;
}

export const Docs: React.FC<DocsProps> = ({ docs, handleUpdateTask }) => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h6 className="mb-1 flex items-center gap-2">
          <FaGreaterThanEqual className="text-sm" />
          Docs
        </h6>
        <UpdateDocsModel handleUpdateTask={handleUpdateTask} value={docs} />
      </header>
      <div className="prose prose-sm">
        {docs && <ReactMarkdown children={docs} remarkPlugins={[remarkGfm]} />}{" "}
        {!docs && "There is no docs to display!"}
      </div>
    </div>
  );
};
