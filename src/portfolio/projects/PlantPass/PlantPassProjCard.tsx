import { IconBrandGithub } from "@tabler/icons-react";
import { ProjectCard, ProjectData } from "../ProjectCard";

const data: ProjectData = {
  image: "/images/plantpass_logo.png",
  title: "PlantPass: Spring Plant Fair Checkout and Revenue Tracking Application",
  type: "UIUC Hort Club Spring Plant Fair",
  dates: "Apr 2024 – Present",
  description:
    "Developing a lightweight React application for the Spring Plant Fair checkout station, streamlining payment workflows, configurable sales options, and real‑time analytics. The system has already supported 700+ transactions totaling $11K+ with zero downtime, and I'm continuing to expand its usability, including a new Barcode Scan feature for 2026. A key focus is refining the interface for non‑technical volunteers to improve efficiency during high‑traffic events.",
  badges: [
    { emoji: "☁️", label: "AWS" },
    { emoji: "⚛️", label: "React/JS" },
    { emoji: "🎨", label: "Material UI" },
    { emoji: "📈", label: "Data Collection" },
    { emoji: "👥", label: "UI/UX" },
  ],
  imageStyle: "contain",
  buttons: [
    {
      label: "Try it out!",
      href: "https://d7t3y7i7q58dz.cloudfront.net/",
      variant: "filled",
    },
    {
      label: "Open Github Repo",
      href: "https://github.com/joku8/PlantPass",
      icon: <IconBrandGithub stroke={1.5} />,
      tooltip: "Open Github Repo",
      isIconOnly: true,
    },
    {
      label: "2024 Spring Plant Fair Sales Figures",
      href: "/files/Hort-Club-Plant-Sale-Figures-0415.pdf",
      variant: "outline",
    },
  ],
};

export function PlantPassProjCard() {
  return <ProjectCard data={data} />;
}