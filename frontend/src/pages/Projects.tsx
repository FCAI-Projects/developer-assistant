import React from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useProjectsQuery } from "../graphql/generated/graphql";

export const Projects: React.FC = () => {
  const { data, error, loading } = useProjectsQuery();

  return (
    <div>
      <div className="mt-5 grid grid-cols-4 gap-5">
        {data &&
          data.projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                owner={project.owner.id}
                link={"project/" + project.id}
                className="w-full"
              />
            );
          })}
      </div>
    </div>
  );
};
