import { IconBrandGithub } from "@tabler/icons-react";
import { ProjectCard, ProjectData } from "../ProjectCard";

const data: ProjectData = {
  image: "/images/GameScope_banner.png",
  title: "GameScope: Video game recommendation platform leveraging machine learning to personalize user experiences",
  type: "Collaborative Project",
  dates: "Jan 2026 – Present",
  description:
    "GameScope is a web application designed to provide personalized video game recommendations based on user preferences and gameplay history. By utilizing machine learning algorithms, GameScope analyzes user data to suggest games that align with individual tastes, providing targeted game discovery.",
  badges: [
    { emoji: "🐍", label: "Python/Jupyter Notebook" },
    { emoji: "🎨", label: "Tailwind CSS" },
    { emoji: "⌨️", label: "TypeScript" },
    { emoji: "🤖", label: "Machine Learning / Deep Learning" },
  ],
  imageStyle: "contain",
  buttons: [
    {
      label: "Open API Github Repo",
      href: "https://github.com/joku8/GameScope_api",
      icon: <IconBrandGithub stroke={1.5} />,
      tooltip: "Open API Github Repo",
      isIconOnly: true,
    },
    {
      label: "Open UI Github Repo",
      href: "https://github.com/joku8/GameScope_ui",
      icon: <IconBrandGithub stroke={1.5} />,
      tooltip: "Open UI Github Repo",
      isIconOnly: true,
    },
  ],
};

export function GameScopeProjCard() {
  return <ProjectCard data={data} />;
}