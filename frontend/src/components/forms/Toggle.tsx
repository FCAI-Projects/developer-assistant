import React from "react";

export const ToggleSwitch: React.FC<React.HTMLAttributes<HTMLInputElement>> = ({ className, children, ...other }) => {
  return (
    <label htmlFor="toggle-example" className={`${className} relative flex cursor-pointer items-center`}>
      <input type="checkbox" id="toggle-example" className="sr-only" {...other} />
      <div className="toggle-bg h-6 w-11 rounded-full border border-gray-200 bg-gray-200"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>
    </label>
  );
};
