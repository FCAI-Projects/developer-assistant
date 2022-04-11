import React from "react";
import { ImSpinner8 } from "react-icons/im";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  red?: boolean;
  green?: boolean;
  yellow?: boolean;
  blue?: boolean;
  lightRed?: boolean;
  lightGreen?: boolean;
  lightYellow?: boolean;
  lightBlue?: boolean;
  light?: boolean;
  label?: string;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BaseButton: React.FC<ButtonProps> = ({ loading, className, label, children, ...other }) => {
  return (
    <button
      className={`${className} mr-2 rounded-lg px-5 py-2.5 text-sm font-medium 
    ${loading ? "focus:ring-none disabled:opacity-70" : ""}`}
      disabled={loading}
      {...other}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <ImSpinner8 className="animate-spin" /> Loading
        </span>
      ) : children ? (
        children
      ) : (
        label
      )}
    </button>
  );
};

export const Button: React.FC<ButtonProps> = ({
  red,
  green,
  yellow,
  lightRed,
  lightGreen,
  lightYellow,
  lightBlue,
  light,
  className,
  ...other
}) => {
  if (lightGreen) {
    return (
      <BaseButton
        className={`${className} bg-green-100 text-green-900  hover:bg-green-200 focus:outline-none`}
        {...other}
      ></BaseButton>
    );
  } else if (lightRed) {
    return (
      <BaseButton
        className={`${className} bg-red-100 text-red-900  hover:bg-red-200 focus:outline-none`}
        {...other}
      ></BaseButton>
    );
  } else if (lightBlue) {
    return (
      <BaseButton
        className={`${className} bg-blue-100 text-blue-900  hover:bg-blue-200 focus:outline-none`}
        {...other}
      ></BaseButton>
    );
  } else if (lightYellow) {
    return (
      <BaseButton
        className={`${className} bg-yellow-100 text-yellow-900  hover:bg-yellow-200 focus:outline-none`}
        {...other}
      ></BaseButton>
    );
  } else if (green) {
    return (
      <BaseButton
        className={`${className} bg-green-700 text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300`}
        {...other}
      ></BaseButton>
    );
  } else if (yellow) {
    return (
      <BaseButton
        className={`${className} bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300`}
        {...other}
      ></BaseButton>
    );
  } else if (red) {
    return (
      <BaseButton
        className={`${className} bg-red-700 text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300`}
        {...other}
      ></BaseButton>
    );
  } else if (light) {
    return (
      <BaseButton
        className={`${className}  border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200`}
        {...other}
      ></BaseButton>
    );
  } else {
    return (
      <BaseButton
        className={`${className} bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300`}
        {...other}
      ></BaseButton>
    );
  }
};
