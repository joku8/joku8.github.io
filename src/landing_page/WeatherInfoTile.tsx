import React from "react";
import { WeatherCondition } from "../services/WeatherService";

interface WeatherInfoTileProps {
  condition: WeatherCondition;
  temperature: number | null;
  description: string;
  location: string;
  progress: number;
  isProgressActive: boolean;
}

const WeatherInfoTile: React.FC<WeatherInfoTileProps> = ({
  condition,
  temperature,
  description,
  location,
  progress,
  isProgressActive,
}) => {
  const getWeatherEmoji = (condition: WeatherCondition): string => {
    const emojiMap: Record<WeatherCondition, string> = {
      sunny: "☀️",
      cloudy: "☁️",
      rainy: "🌧️",
      snowy: "❄️",
      foggy: "🌫️",
      stormy: "⛈️",
      unavailable: "❓",
    };
    return emojiMap[condition];
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        padding: "16px 24px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        minWidth: "320px",
        zIndex: 100,
      }}
    >
      {/* Weather Info Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "24px" }}>{getWeatherEmoji(condition)}</span>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              {location}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                textTransform: "capitalize",
              }}
            >
              {description}
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {temperature !== null ? `${Math.round(temperature)}°F` : 'N/A'}
        </div>
      </div>

      {/* Planting Progress Section */}
      <div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            marginBottom: "6px",
            color: "#555",
          }}
        >
          Planting Progress
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: isProgressActive ? "#4caf50" : "#4caf50",
              transition: "none",
              willChange: "width",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoTile;
