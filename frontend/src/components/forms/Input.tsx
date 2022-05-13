import React from "react";
import { InputProps } from "./interfaces";

export const Input: React.FC<InputProps> = ({ className, children, error, ...other }) => {
  return (
    <>
      <input
        className={`${className} block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 ${
          error
            ? "border border-red-500 bg-red-50 text-red-900 placeholder-red-700"
            : "border-gray-300 bg-gray-50 text-gray-900"
        }`}
        {...other}
      />
      {error && <span className="px-1 text-xs  text-red-500">{error}</span>}
    </>
  );
};
