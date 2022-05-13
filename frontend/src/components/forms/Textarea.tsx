import React from "react";

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  children,
  ...other
}) => {
  return (
    <textarea
      className={`${className} my-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}
      {...other}
    >
      {children}
    </textarea>
  );
};
