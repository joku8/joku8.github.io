import React from "react";
import { Title, SimpleGrid } from "@mantine/core";
import { ProjectCard, ProjectData } from "./ProjectCard";
import projectsData from "../../data/projects.json";

const ProjectsWrapper: React.FC = () => {
  const projects = projectsData as ProjectData[];

  return (
    <>
      <Title order={2} style={{ marginBottom: "1rem" }}>
        Projects
      </Title>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectsWrapper;