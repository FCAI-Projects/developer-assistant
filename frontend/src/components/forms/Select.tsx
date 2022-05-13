import React from "react";

export const Select: React.FC<React.HTMLAttributes<HTMLSelectElement>> = ({ className, children, ...other }) => {
  return (
    <select
      className={`${className} block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 `}
      {...other}
    >
      {children}
    </select>
  );
};

// TODO: add custom select box from headlessui
