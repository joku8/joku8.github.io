import { IconBrandGithub } from "@tabler/icons-react";
import { ProjectCard, ProjectData } from "../ProjectCard";

const data: ProjectData = {
  image: "/images/agrodetect-ss.png",
  title: "AgroDetect: Crop Disease & Pest Tracker",
  type: "HackIllinois 2023",
  dates: "Mar 2023 - Nov 2023",
  description:
    "A full-stack web app that helps farmers identify crop damage using image uploads and machine learning. Tracks pest and disease spread via location data, enabling real-time alerts and regional insights. Built with TensorFlow, Flask, MongoDB, and JavaScript.",
  badges: [
    { emoji: "🧠", label: "Machine Learning (Tensorflow)" },
    { emoji: "🐍", label: "Python + Flask" },
    { emoji: "🎨", label: "Material UI" },
    { emoji: "📈", label: "Data Collection" },
    { emoji: "🌾", label: "Digital Agriculture" },
  ],
  imageStyle: "cover",
  buttons: [
    {
      label: "Project Presentation",
      href: "/files/AgroDetect_HackIllinoisPresentation.pdf",
      variant: "filled",
    },
    {
      label: "Open Github Repo",
      href: "https://github.com/joku8/AgroDectect-Webapp",
      icon: <IconBrandGithub stroke={1.5} />,
      tooltip: "Open Github Repo",
      isIconOnly: true,
    },
  ],
};

export function AgroDetectProjCard() {
  return <ProjectCard data={data} />;
}