import { IconReportAnalytics } from "@tabler/icons-react";
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
import classes from "./TerraRefProjCard.module.css";

const data = {
  image: "/images/TERRA-REF-Scanner.jpg",
  title:
    "Development of a Machine Learning Model for Predicting Plant Traits Using High-Resolution Sensor Data from TERRA-REF",
  type: "2024 Undergraduate Research Symposium",
  dates: "Feb 2024 - Apr 2024",
  description:
    "Used machine learning to predict plant traits like biomass yield from high-resolution TERRA-REF sensor data, focusing on Sorghum bicolor. Highlights the potential of data-driven phenotyping to boost agricultural productivity.",
  badges: [
    { emoji: "🐍", label: "Python" },
    { emoji: "🧠", label: "Machine Learning" },
    { emoji: "🌾", label: "Digital Agriculture" },
    { emoji: "📊", label: "Data Science/Visualization" },
  ],
};

export function TerraRefProjCard() {
  const { image, title, type, dates, description, badges } = data;
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
      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          component="a"
          href="https://terraref.org/index.html"
          target="_blank"
          sx={{
            backgroundColor: "#228be6", // base blue
            color: "white",
            "&:hover": {
              color: "white", // darker blue on hover
            },
          }}
        >
          Learn more about TERRA-REF
        </Button>
        <Tooltip label="Open Poster PDF" withArrow>
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            component="a"
            href="https://doi.org/10.5281/zenodo.14813589"
            target="_blank"
          >
            <IconReportAnalytics className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
}
