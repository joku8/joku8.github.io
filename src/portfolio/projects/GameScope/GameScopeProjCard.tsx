import { IconBrandGithub } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import classes from "./GameScopeProjCard.module.css";

const data = {
  image: "/images/GameScope_banner.png",
  title:
    "GameScope: Video game recommendation platform leveraging machine learning to personalize user experiences",
  type: "Collaborative Project",
  dates: "Jan 2026 – Present",
  description:
    "GameScope is a web application designed to provide personalized video game recommendations based on user preferences and gameplay history. By utilizing machine learning algorithms, GameScope analyzes user data to suggest games that align with individual tastes, providing targeted game discovery.",
  badges: [{ emoji: "🐍", label: "Python/Jupyter Notebook" }],
};

export function GameScopeProjCard() {
  const { image, title, type, dates, description, badges } = data;
  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <div
          style={{
            height: "180px",
            width: "100%",
            display: "flex",
            justifyContent: "center", // horizontal center (optional)
            alignItems: "center", // vertical center
            backgroundColor: "white", // fills empty space
          }}
        >
          <Image
            src={image}
            alt={title}
            style={{
              maxHeight: "100%", // scales image to fit height
              maxWidth: "100%", // scales image to fit width
              objectFit: "contain", // maintain aspect ratio, no distortion
            }}
          />
        </div>
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
        <div style={{ height: "9px" }} />
        <Text fz="xs" c="dimmed" mt={2}>
          {dates}
        </Text>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>
      <Group mt="xs" position="right">
        <Tooltip label="Open Github Repo" withArrow>
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            component="a"
            href="https://github.com/joku8/GameScope"
            target="_blank"
          >
            <IconBrandGithub className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
}
