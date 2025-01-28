import React, { useState } from "react";
import SeedStack from "./SeedStack";
import ProgressBar from "./ProgressBar";

const LandingPage: React.FC = () => {
  const [isProgressActive, setIsProgressActive] = useState(false);

  const handleProgressComplete = () => {
    console.log("Progress Bar Complete!");
    // Perform any actions when the progress completes
  };

  return (
    <div
      style={{
        backgroundColor: "#87ceeb",
        height: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Progress Bar */}
      <ProgressBar
        isFilling={isProgressActive}
        onComplete={handleProgressComplete}
      />

      {/* Sun image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "20vh",
          aspectRatio: "1 / 1",
          backgroundImage: "url('/artifacts/sun.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />

      {/* Seed Stack Component */}
      <SeedStack setProgressActive={setIsProgressActive} />

      {/* Soil image at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "10vh",
          backgroundImage: "url('/artifacts/soil.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top left",
        }}
      />
    </div>
  );
};

export default LandingPage;
