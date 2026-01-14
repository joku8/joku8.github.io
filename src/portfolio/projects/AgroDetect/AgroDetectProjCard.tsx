import { IconBrandGithub } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text, Tooltip } from '@mantine/core';
import classes from './AgroDetectProjCard.module.css';

const data = {
  image:
    '/images/agrodetect-ss.png',
  title: 'AgroDetect: Crop Disease & Pest Tracker',
  type: 'HackIllinois 2023',
  description:
    'A full-stack web app that helps farmers identify crop damage using image uploads and machine learning. Tracks pest and disease spread via location data, enabling real-time alerts and regional insights. Built with TensorFlow, Flask, MongoDB, and JavaScript.',
  badges: [
    { emoji: '🧠', label: 'Machine Learning (Tensorflow)' },
    { emoji: '🐍', label: 'Python + Flask' },
    { emoji: '🎨', label: 'Material UI' },
    { emoji: '📈', label: 'Data Collection' },
    { emoji: '🌾', label: 'Digital Agriculture' },
  ],
};

export function AgroDetectProjCard() {
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
        href="/files/AgroDetect_HackIllinoisPresentation.pdf"
        target="_blank"
        sx={{
          backgroundColor: '#228be6', // base blue
          color: 'white',
          '&:hover': {
            color: 'white', // darker blue on hover
          },
        }}
      >
        Project Presentation
      </Button>
      <Tooltip label="Open Github Repo" withArrow>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          component="a"
          href="https://github.com/joku8/AgroDectect-Webapp"
          target="_blank"
        >
          <IconBrandGithub className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      </Group>
    </Card>
  );
}