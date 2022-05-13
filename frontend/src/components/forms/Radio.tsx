import React from "react";

export const Radio: React.FC<React.HTMLAttributes<HTMLInputElement>> = ({ children, className, id, ...other }) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        id={id}
        type="radio"
        className={`${className} h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300`}
        aria-labelledby={id}
        aria-describedby={id}
        {...other}
      />
      <label htmlFor={id} className="ml-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
        {children}
      </label>
    </div>
  );
};
