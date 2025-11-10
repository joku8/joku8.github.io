import { IconBrandGithub } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text, Tooltip } from '@mantine/core';
import classes from './PlantPassProjCard.module.css';

const data = {
  image:
    '/images/spf2024.jpg',
  title: 'PlantPass: Spring Plant Fair Checkout and Rveenue Tracking Application',
  type: 'UIUC Horticulture Club Spring Plant Fair',
  description:
    'Built a lightweight React app for the Spring Plant Fair checkout station, streamlining the payment process and applying discounts dynamically. Processed 700+ transactions totaling $11K+ with zero downtime, while enabling post-sale analytic. Designed for non-technical volunteers, improving speed and accuracy at a high-traffic public event.',
  badges: [
    { emoji: '⚛️', label: 'React/JS' },
    { emoji: '🎨', label: 'Material UI' },
    { emoji: '📈', label: 'Data Collection' },
    { emoji: '👥', label: 'UI/UX' },
  ],
};

export function PlantPassProjCard() {
  const { image, title, type, description, badges } = data;
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
        <Group spacing={10}>
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {type}
          </Badge>
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
        href="https://joku8.github.io/PlantPass/"
        target="_blank"
        sx={{
          backgroundColor: '#228be6', // base blue
          color: 'white',
          '&:hover': {
            color: 'white', // darker blue on hover
          },
        }}
      >
        Try it out!
      </Button>
      <Tooltip label="Open Github Repo" withArrow>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          component="a"
          href="https://github.com/joku8/PlantPass"
          target="_blank"
        >
          <IconBrandGithub className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      </Group>
      <div style={{ height: "0.5rem" }} />
    <Group>
      <Button
        radius="md"
        style={{ flex: 1 }}
        component="a"
        href="/files/Hort-Club-Plant-Sale-Figures-0415.pdf"
        target="_blank"
        variant="outline"
        sx={{
          borderColor: '#228be6',
          color: '#228be6',
          '&:hover': {
            backgroundColor: '#e7f5ff', // light blue hover
            borderColor: '#1864ab',     // darker blue border
            color: '#1864ab',
          },
        }}
      >
        2024 Spring Plant Fair Sales Figures
      </Button>
    </Group>
    </Card>
  );
}