import React from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useProjectsQuery } from "../graphql/generated/graphql";

export const Projects: React.FC = () => {
  const { data, error, loading } = useProjectsQuery();

  return (
    <div>
      <div className="mt-5 grid grid-cols-4 gap-5">
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
        <ProjectCard
          name="Project 1"
          description="e-commerce project similar to noon"
          link="project/id"
          className="w-full"
        />
      </div>
    </div>
  );
};
