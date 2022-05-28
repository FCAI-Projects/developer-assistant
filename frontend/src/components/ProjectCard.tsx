import { match } from "assert";
import React from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  link: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description, link, className }) => {
  return (
    <div className={`${className} bg-white hover:shadow-inner rounded-md border`}>
      <Link to={link} className="block text-center">
        <div className="overflow-hidden p-6">
          <div className="mb-2 text-xl font-bold">{name}</div>
          <p className="text-base text-gray-700">{description}</p>
        </div>
      </Link>
    </div>
  );
};
