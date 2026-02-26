import React, { useState, useEffect } from "react";
import SeedStack from "./SeedStack";
import ProgressBar from "./ProgressBar";
import Typewriter from "./Typewriter";
import ContinueSign from "./ContinueSign";

interface LandingPageProps {
  setShowPortfolio: (value: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setShowPortfolio }) => {
  const [isProgressActive, setIsProgressActive] = useState(false);
  const [isProgressComplete, setIsProgressComplete] = useState(false);
  const [isFirstLineDone, setIsFirstLineDone] = useState(false);
  const [isSecondLineDone, setIsSecondLineDone] = useState(false);
  const [isThirdLineDone, setIsThirdLineDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
      setShowPortfolio(true);
    }
  }, [setShowPortfolio]);
  

  const handleSignClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPortfolio(true);
    }, 1000);
  };

  useEffect(() => {
    if (isThirdLineDone) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowPortfolio(true);
        }, 1000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isThirdLineDone, setShowPortfolio]);

  const sunWidth = 0.12 * viewportWidth;
  const seedPacketWidth = 0.3 * viewportHeight * (1 / 1.5);
  const progressBarLeft = sunWidth + 30;
  const progressBarRight = viewportWidth - seedPacketWidth - 30;
  const progressBarWidth = progressBarRight - progressBarLeft;


  return (
    <div
      style={{
        backgroundColor: fadeOut ? "#ffffff" : "#87ceeb",
        height: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        transition: "background-color 1s ease-in-out, opacity 1s ease-in-out",
        opacity: fadeOut ? 0 : 1,
      }}
    >
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
          <Typewriter
            text="Welcome to Joe's Garden!"
            onComplete={() => setIsFirstLineDone(true)}
            hideCursor={isFirstLineDone}
          />
        </div>

        <div>
          {isFirstLineDone && (
            <Typewriter
              text="Sow some seeds to begin..."
              onComplete={() => setIsSecondLineDone(true)}
              hideCursor={isProgressComplete}
            />
          )}
        </div>

        <div>
          {isSecondLineDone && isProgressComplete && (
            <Typewriter
              text="Planting Complete..."
              onComplete={() => setIsThirdLineDone(true)}
              hideCursor={false}
            />
          )}
        </div>
      </div>

      <ProgressBar
        isFilling={isProgressActive}
        onComplete={() => setIsProgressComplete(true)}
        left={progressBarLeft}
        width={progressBarWidth}
        top={"5vh"}
        freeze={isProgressComplete}
      />

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

      <SeedStack
        setProgressActive={setIsProgressActive}
        freeze={isProgressComplete}
        vpHeight={viewportHeight}
        vpWidth={viewportWidth}
      />

      <ContinueSign
        onClick={handleSignClick}
      />

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
