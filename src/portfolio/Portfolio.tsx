import React from "react";
import { MyInfo } from "./MyInfo";
import { TerraRefProjCard } from "./TerraRefProjCard";
import { Title, SimpleGrid } from "@mantine/core";

const Portfolio: React.FC = () => {
  return (
    <div>
      <MyInfo />
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
        <TerraRefProjCard />
        <TerraRefProjCard />
        <TerraRefProjCard />
      </SimpleGrid>
    </div>
  );
};

export default Portfolio;