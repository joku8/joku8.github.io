import { IconReportAnalytics } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text, Tooltip } from '@mantine/core';
import classes from './TerraRefProjCard.module.css';

const mockdata = {
  image:
    '/images/TERRA-REF-Scanner.jpg',
  title: 'Development of a Machine Learning Model for Predicting Plant Traits Using High-Resolution Sensor Data from TERRA-REF',
  description:
    'This project used machine learning to predict plant traits from high-resolution sensor data collected by the TERRA-REF scanner, focusing on Sorghum bicolor. By identifying key features and optimizing model accuracy, it demonstrates the potential of data-driven phenotyping to enhance agricultural productivity and sustainability.',
  badges: [
    { emoji: '🐍', label: 'Python' },
    { emoji: '🧠', label: 'Machine Learning' },
    { emoji: '🌾', label: 'Digital Agriculture' },
    { emoji: '📊', label: 'Data Science/Visualization' },
  ],
};

export function TerraRefProjCard() {
  const { image, title, description, badges } = mockdata;
  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button
        radius="md"
        style={{ flex: 1 }}
        component="a"
        href="https://terraref.org/index.html"
        target="_blank"
        >
            Learn more about TERRA-REF
        </Button>
      <Tooltip label="Open Poster PDF" withArrow>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          component="a"
          href="/files/CLEP-2024-TerraRef-Joseph-Ku.pdf"
          target="_blank"
        >
          <IconReportAnalytics className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      </Group>
    </Card>
  );
}