import React from "react";
import { MyInfo } from "./MyInfo";
import { ExperienceTable } from "./experiences/ExperiencesTable";
import PlantTrivia from "./trivia/PlantTrivia";
import ProjectsWrapper from "./projects/ProjectsWrapper";
import { Volunteering } from "./volunteering/Volunteering";

const Portfolio: React.FC = () => {
  return (
    <div>
      <MyInfo />
      <div style={{ height: "2rem" }} />

      <ExperienceTable/>
      <div style={{ height: "2rem" }} />

      <ProjectsWrapper/>
      <div style={{ height: "2rem" }} />

      <PlantTrivia/>
      <div style={{ height: "2rem" }} />

      <Volunteering />
    </div>
  );
};

export default Portfolio;