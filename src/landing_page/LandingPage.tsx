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
  const [isProgressComplete, setIsProgressComplete] = useState(false);
  const [isFirstLineDone, setIsFirstLineDone] = useState(false);
  const [isSecondLineDone, setIsSecondLineDone] = useState(false);

  // Typewriter effects
  const { displayText: line1, showCursor: showCursor1 } = useTypewriter(
    "Welcome to Joe's Garden!",
    100,
    () => setIsFirstLineDone(true)
  );

  const { displayText: line2, showCursor: showCursor2 } = useTypewriter(
    isFirstLineDone ? "Sow some seeds to begin..." : "",
    100,
    () => setIsSecondLineDone(true)
  );

  const { displayText: line3, showCursor: showCursor3 } = useTypewriter(
    isSecondLineDone && isProgressComplete ? "Planting Complete..." : "",
    100
  );

  // Dynamic calculations
  const viewportWidth = window.innerWidth;
  const sunWidth = 0.12 * viewportWidth; // Sun image width (12% of viewport width)
  const seedPacketWidth = 0.3 * window.innerHeight * (1 / 1.5); // Seed packet width

  const progressBarLeft = sunWidth + 30; // Leaves 30px gap from the sun
  const progressBarRight = viewportWidth - seedPacketWidth - 30; // Leaves 30px gap from the seed packets
  const progressBarWidth = progressBarRight - progressBarLeft;

  const handleProgressComplete = () => {
    setIsProgressComplete(true); // Set the progress to complete
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
        userSelect: "none", // Disable text selection for the entire page
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
          userSelect: "none",
        }}
      >
        <div>
          {line1}
          {!isFirstLineDone && showCursor1 ? "|" : ""}
        </div>
        <div>
          {line2}
          {isFirstLineDone &&
          (!isSecondLineDone || showCursor2) &&
          !isProgressComplete
            ? "|"
            : ""}
        </div>
        <div>
          {line3}
          {isSecondLineDone && isProgressComplete && showCursor3 ? "|" : ""}
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        isFilling={isProgressActive}
        onComplete={handleProgressComplete}
        left={progressBarLeft}
        width={progressBarWidth}
        top={"5vh"}
        freeze={isProgressComplete}
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

      {/* Seed Stack */}
      <SeedStack
        setProgressActive={setIsProgressActive}
        freeze={isProgressComplete}
      />

      {/* Soil image */}
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
