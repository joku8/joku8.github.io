import React from 'react';
import { Title, SimpleGrid } from '@mantine/core';
import { PlantPassProjCard } from './PlantPassProjCard';
import { TerraRefProjCard } from './TerraRefProjCard';
import { AgroDetectProjCard } from './AgroDetectProjCard';

const ProjectsWrapper: React.FC = () => {
  return (
    <>
      <Title order={2} style={{ marginBottom: '1rem' }}>
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
        <PlantPassProjCard />
        <TerraRefProjCard />
        <AgroDetectProjCard />
      </SimpleGrid>
    </>
  );
};

export default ProjectsWrapper;