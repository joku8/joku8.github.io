import React, { useState, useEffect, useCallback, useMemo } from "react";
import SeedStack from "./SeedStack";
import Typewriter from "./Typewriter";
import ContinueSign from "./ContinueSign";
import { WeatherService, WeatherCondition, WeatherData } from "../services/WeatherService";
import WeatherVisualizer from "../components/weather/WeatherVisualizer";
import WeatherInfoTile from "./WeatherInfoTile";

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
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('sunny');
  const [weatherData, setWeatherData] = useState<WeatherData>({
    condition: 'sunny',
    temperature: 72,
    timestamp: Date.now(),
    description: 'Clear sky'
  });
  const [progress, setProgress] = useState(0);

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
    const fetchWeatherData = async () => {
      const data = await WeatherService.fetchWeather();
      setWeatherCondition(data.condition);
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
      setShowPortfolio(true);
    }
  }, [setShowPortfolio]);
  
  const handleSignClick = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPortfolio(true);
    }, 1000);
  }, [setShowPortfolio]);

  useEffect(() => {
    if (!isProgressActive || isProgressComplete) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setIsProgressComplete(true);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isProgressActive, isProgressComplete]);

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

  const layout = useMemo(() => {
    const sunWidth = 0.12 * viewportWidth;
    const seedPacketWidth = 0.3 * viewportHeight * (1 / 1.5);
    const progressBarLeft = sunWidth + 30;
    const progressBarRight = viewportWidth - seedPacketWidth - 30;
    const progressBarWidth = progressBarRight - progressBarLeft;
    
    return { sunWidth, progressBarLeft, progressBarWidth };
  }, [viewportWidth, viewportHeight]);


  return (
    <div
      style={{
        backgroundColor: fadeOut ? "#ffffff" : "transparent",
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
      <WeatherVisualizer
        condition={weatherCondition}
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
        fadeOut={fadeOut}
      />
      <div
        style={{
          position: "absolute",
          top: "25vh",
          left: `${layout.progressBarLeft}px`,
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "5vh",
          color: "darkgreen",
          textAlign: "left",
          lineHeight: "1.5",
          userSelect: "none",
          zIndex: 100,
        }}
      >
        <Typewriter
          text="Welcome to Joe's Garden!"
          onComplete={() => setIsFirstLineDone(true)}
          hideCursor={isFirstLineDone}
        />

        {isFirstLineDone && (
          <div>
            <Typewriter
              text="Sow some seeds to begin..."
              onComplete={() => setIsSecondLineDone(true)}
              hideCursor={isProgressComplete}
            />
          </div>
        )}

        {isSecondLineDone && isProgressComplete && (
          <div>
            <Typewriter
              text="Planting Complete..."
              onComplete={() => setIsThirdLineDone(true)}
              hideCursor={false}
            />
          </div>
        )}
      </div>

      {/* Weather Info Tile with Progress */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        <WeatherInfoTile
          condition={weatherData.condition}
          temperature={weatherData.temperature}
          description={weatherData.description}
          location="Des Moines, IA"
          progress={progress}
          isProgressActive={isProgressActive}
        />
      </div>

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
          zIndex: 100,
        }}
      />

    </div>

  );
};

export default LandingPage;
