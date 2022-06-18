import React from "react";

interface Props {
  title: string;
  value: number;
  icon: React.ReactElement;
}

export const Card: React.FC<Props> = ({ title, value, icon }) => {
  return (
    <div className="flex flex-1 items-center justify-between border bg-white px-5 py-4 shadow-inner">
      <div>
        <h3 className="">{title}</h3>
        <span className="text-5xl font-medium text-slate-800">{value}</span>
      </div>
      <span className="text-6xl">{icon}</span>
    </div>
  );
};
