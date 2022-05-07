import React from "react";

export const Form: React.FC = () => {
  return <div>Form</div>;
};

export interface UploadFileProps extends React.HTMLAttributes<HTMLInputElement> {
  note?: string;
  label?: string;
}

// TODO: add succes and error states
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...other }) => {
  return (
    <label className={`${className} block text-sm font-medium text-gray-900 dark:text-gray-300`} {...other}>
      {children}
    </label>
  );
};

// TODO: add succes and error states and icon to input
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, children, ...other }) => {
  return (
    <input
      className={`${className} my-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}
      {...other}
    >
      {children}
    </input>
  );
};

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

export const HelperText: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...other }) => {
  return (
    <p className={`${className} mt-2 text-sm text-gray-500 dark:text-gray-400`} {...other}>
      {children}
    </p>
  );
};

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

export const UploadFile: React.FC<UploadFileProps> = ({ className, id, note, label, ...other }) => {
  return (
    <>
      <Label className="mb-2" htmlFor={id}>
        {label}
      </Label>
      <input
        className={`${className} block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-transparent focus:outline-none`}
        aria-describedby={id + "_help"}
        id={id}
        type="file"
        {...other}
      />
      {note && (
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id={id + "_help"}>
          {note}
        </div>
      )}
    </>
  );
};

export const ToggleSwitch: React.FC<React.HTMLAttributes<HTMLInputElement>> = ({ className, children, ...other }) => {
  return (
    <label htmlFor="toggle-example" className={`${className} relative flex cursor-pointer items-center`}>
      <input type="checkbox" id="toggle-example" className="sr-only" {...other} />
      <div className="toggle-bg h-6 w-11 rounded-full border border-gray-200 bg-gray-200"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>
    </label>
  );
};
