import React, { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  link: string;
  owner: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description, link, className, owner }) => {
  const authToken = useRecoilValue(authState);
  const decodedToken: any = decodeToken(authToken || "");

  return (
    <div className={`${className} rounded-md border bg-white hover:shadow-inner`}>
      <Link to={link} className="block text-center">
        <div className="overflow-hidden">
          <div className="px-6 py-6">
            {decodedToken?._id === owner && <FaCrown className="mx-auto text-xl text-yellow-500" />}
            <div className="mb-2 text-xl font-bold">{name}</div>
            <p className="text-base text-gray-700">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
