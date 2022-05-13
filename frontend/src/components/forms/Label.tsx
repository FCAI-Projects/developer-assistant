import React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...other }) => {
  return (
    <label className={`${className} block text-sm font-medium text-gray-900 dark:text-gray-300`} {...other}>
      {children}
    </label>
  );
};
