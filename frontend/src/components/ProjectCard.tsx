import React from "react";

interface ProjectCardProps {
  name: string;
  description: string;
  link: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, link, className }) => {
  return (
    <div className={`${className} hover:shadow-inner`}>
      <a href={link} className="block text-center">
        <div className="overflow-hidden rounded-md border">
          <div className="px-6 py-6">
            <div className="mb-2 text-xl font-bold">{name}</div>
            <p className="text-base text-gray-700">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
