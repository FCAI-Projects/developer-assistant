import React from "react";

export const Checkbox: React.FC<React.HTMLAttributes<HTMLInputElement>> = ({ children, className, id, ...other }) => {
  return (
    <div className="flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={id}
          aria-describedby={id}
          type="checkbox"
          className={`${className} focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600`}
          {...other}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-900 dark:text-gray-300">
          {children}
        </label>
      </div>
    </div>
  );
};
