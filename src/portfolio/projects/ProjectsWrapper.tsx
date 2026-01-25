import React from "react";
import { Title, SimpleGrid } from "@mantine/core";
import { PlantPassProjCard } from "./PlantPass/PlantPassProjCard";
import { TerraRefProjCard } from "./TerraRef/TerraRefProjCard";
import { AgroDetectProjCard } from "./AgroDetect/AgroDetectProjCard";
import { GameScopeProjCard } from "./GameScope/GameScopeProjCard";

const ProjectsWrapper: React.FC = () => {
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
        <PlantPassProjCard />
        <GameScopeProjCard />
        <TerraRefProjCard />
        <AgroDetectProjCard />
      </SimpleGrid>
    </>
  );
};

export default ProjectsWrapper;
