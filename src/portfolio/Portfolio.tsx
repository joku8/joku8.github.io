import React from "react";
import { MyInfo } from "./MyInfo";
import { TerraRefProjCard } from "./projects/TerraRefProjCard";
import { Title, SimpleGrid } from "@mantine/core";
import { PlantPassProjCard } from "./projects/PlantPassProjCard";
import { AgroDetectProjCard } from "./projects/AgroDetectProjCard";
import { ExperienceTable } from "./experiences/ExperiencesTable";

const Portfolio: React.FC = () => {
  return (
    <div>
      <MyInfo />
      <div style={{ height: "2rem" }} />

      <Title order={2} style={{ marginBottom: "1rem" }}>
        Experiences
      </Title>
      <ExperienceTable/>
      <div style={{ height: "2rem" }} />
      
      <Title order={2} style={{ marginBottom: "1rem" }}>
        Projects
      </Title>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
        ]}
      >
        <PlantPassProjCard/>
        <TerraRefProjCard />
        <AgroDetectProjCard />
      </SimpleGrid>
    </div>
  );
};

export default Portfolio;