import React, { useState, useEffect } from "react";
import SeedStack from "./SeedStack";
import ProgressBar from "./ProgressBar";

// Typewriter Hook with Moving Cursor
const useTypewriter = (
  text: string,
  speed: number = 100,
  onComplete?: () => void
) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return { displayText, showCursor };
};

const LandingPage: React.FC = () => {
  const [isProgressActive, setIsProgressActive] = useState(false);
  const [isFirstLineDone, setIsFirstLineDone] = useState(false);

  const { displayText: line1, showCursor: showCursor1 } = useTypewriter(
    "Welcome to Joe's Garden!",
    100,
    () => setIsFirstLineDone(true)
  );

  const { displayText: line2, showCursor: showCursor2 } = useTypewriter(
    isFirstLineDone ? "Sow some seeds to begin..." : "",
    100
  );

  // **Dynamic Calculations**
  const viewportWidth = window.innerWidth;
  const sunWidth = 0.12 * viewportWidth; // Sun image width (12% of viewport width)
  const seedPacketWidth = 0.3 * window.innerHeight * (1 / 1.5); // Seed packet width

  const progressBarLeft = sunWidth + 30; // Leaves 30px gap from the sun
  const progressBarRight = viewportWidth - seedPacketWidth - 30; // Leaves 30px gap from the seed packets
  const progressBarWidth = progressBarRight - progressBarLeft;

  const handleProgressComplete = () => {
    console.log("Progress Bar Complete!");
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
      {/* Welcome Text - Left aligned with Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: "25vh",
          left: `${progressBarLeft}px`,
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "5vh",
          color: "darkgreen",
          textAlign: "left",
          lineHeight: "1.5",
        }}
      >
        <div>
          {line1}
          {isFirstLineDone ? "" : showCursor1 ? "|" : ""}
        </div>
        <div>
          {line2}
          {isFirstLineDone && showCursor2 ? "|" : ""}
        </div>
      </div>

      {/* Progress Bar - Dynamically Positioned */}
      <ProgressBar
        isFilling={isProgressActive}
        onComplete={handleProgressComplete}
        left={progressBarLeft}
        width={progressBarWidth}
        top={"5vh"} // Set top position to 5% of viewport height
      />

      {/* Sun image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${sunWidth}px`,
          height: "20vh",
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
