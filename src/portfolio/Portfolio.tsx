import React from "react";
import { MyInfo } from "./MyInfo";
import { ExperienceTable } from "./experiences/ExperiencesTable";
import PlantTrivia from "./trivia/PlantTrivia";
import ProjectsWrapper from "./projects/ProjectsWrapper";
import { Volunteering } from "./volunteering/Volunteering";
import { News } from "./news/News";
import { Spacer } from "../components/Spacer";

const Portfolio: React.FC = () => {
  return (
    <div>
      <MyInfo />
      <Spacer />

      <ExperienceTable/>
      <Spacer />

      <ProjectsWrapper/>
      <Spacer />

      <News/>
      <Spacer />

      <PlantTrivia/>
      <Spacer />

      <Volunteering />
    </div>
  );
};

export default Portfolio;