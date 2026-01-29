import { IconBrandGithub, IconReportAnalytics } from "@tabler/icons-react";
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
import classes from "./ProjectCard.module.css";
import { BadgeGroup } from "../../components/BadgeGroup";

export interface ProjectButton {
  label: string;
  href: string;
  variant?: "filled" | "outline";
  icon?: string | React.ReactNode;
  tooltip?: string;
  isIconOnly?: boolean;
}

export interface ProjectData {
  id: string;
  image: string;
  title: string;
  type: string;
  dates: string;
  description: string;
  badges: Array<{ emoji: string; label: string }>;
  buttons: ProjectButton[];
  imageStyle?: "contain" | "cover";
}

interface ProjectCardProps {
  data: ProjectData;
}

const getIcon = (iconName: string | React.ReactNode): React.ReactNode => {
  if (typeof iconName === 'string') {
    switch (iconName) {
      case 'github':
        return <IconBrandGithub className={classes.like} stroke={1.5} />;
      case 'report':
        return <IconReportAnalytics className={classes.like} stroke={1.5} />;
      default:
        return <IconBrandGithub className={classes.like} stroke={1.5} />;
    }
  }
  return iconName;
};

export function ProjectCard({ data }: ProjectCardProps) {
  const { image, title, type, dates, description, badges, buttons, imageStyle = "cover" } = data;

  const renderImage = () => {
    if (imageStyle === "contain") {
      return (
        <div
          style={{
            height: "180px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            src={image}
            alt={title}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      );
    }
    
    return <Image src={image} alt={title} height={180} />;
  };

  const renderButtons = () => {
    const fullWidthButtons = buttons.filter(btn => !btn.isIconOnly);
    const iconButtons = buttons.filter(btn => btn.isIconOnly);

    return (
      <>
        {fullWidthButtons.map((button, index) => (
          <Group key={index} mt={index === 0 ? "xs" : "sm"}>
            <Button
              radius="md"
              style={{ flex: 1 }}
              component="a"
              href={button.href}
              target="_blank"
              variant={button.variant || "filled"}
              sx={
                button.variant === "outline"
                  ? {
                      borderColor: "#228be6",
                      color: "#228be6",
                      "&:hover": {
                        backgroundColor: "#e7f5ff",
                        borderColor: "#1864ab",
                        color: "#1864ab",
                      },
                    }
                  : {
                      backgroundColor: "#228be6",
                      color: "white",
                      "&:hover": {
                        color: "white",
                      },
                    }
              }
            >
              {button.label}
            </Button>
            {index === 0 && iconButtons.length > 0 && (
              <>
                {iconButtons.map((iconBtn, iconIndex) => (
                  <Tooltip key={iconIndex} label={iconBtn.tooltip || iconBtn.label} withArrow>
                    <ActionIcon
                      variant="default"
                      radius="md"
                      size={36}
                      component="a"
                      href={iconBtn.href}
                      target="_blank"
                    >
                      {getIcon(iconBtn.icon || 'github')}
                    </ActionIcon>
                  </Tooltip>
                ))}
              </>
            )}
          </Group>
        ))}
        {fullWidthButtons.length === 0 && iconButtons.length > 0 && (
          <Group mt="xs" position="right">
            {iconButtons.map((iconBtn, iconIndex) => (
              <Tooltip key={iconIndex} label={iconBtn.tooltip || iconBtn.label} withArrow>
                <ActionIcon
                  variant="default"
                  radius="md"
                  size={36}
                  component="a"
                  href={iconBtn.href}
                  target="_blank"
                >
                  {getIcon(iconBtn.icon || 'github')}
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>
        )}
      </>
    );
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        {renderImage()}
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
        <div style={{ marginTop: '5px' }}>
          <BadgeGroup badges={badges} spacing={7} />
        </div>
      </Card.Section>
      
      {renderButtons()}
      <div style={{ height: "0.5rem" }} />
    </Card>
  );
}