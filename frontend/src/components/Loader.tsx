import React from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <CgSpinnerTwoAlt className={`${className} animate-spin text-5xl`} />;
};
