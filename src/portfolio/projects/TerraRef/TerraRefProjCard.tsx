import { IconReportAnalytics } from "@tabler/icons-react";
import { ProjectCard, ProjectData } from "../ProjectCard";

const data: ProjectData = {
  image: "/images/TERRA-REF-Scanner.jpg",
  title: "Development of a Machine Learning Model for Predicting Plant Traits Using High-Resolution Sensor Data from TERRA-REF",
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
  imageStyle: "cover",
  buttons: [
    {
      label: "Learn more about TERRA-REF",
      href: "https://terraref.org/index.html",
      variant: "filled",
    },
    {
      label: "Open Poster PDF",
      href: "https://doi.org/10.5281/zenodo.14813589",
      icon: <IconReportAnalytics stroke={1.5} />,
      tooltip: "Open Poster PDF",
      isIconOnly: true,
    },
  ],
};

export function TerraRefProjCard() {
  return <ProjectCard data={data} />;
}