import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  isFilling: boolean;
  onComplete: () => void;
  left: number; // Dynamically set left position
  width: number; // Dynamically set width
  top: string; // Dynamically set top position
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  isFilling,
  onComplete,
  left,
  width,
  top,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isFilling) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!);
            onComplete();
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFilling, onComplete]);

  return (
    <div
      style={{
        position: "absolute",
        top: top,
        left: `${left}px`,
        width: `${width}px`,
        textAlign: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        Planting Progress
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#ddd",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            transition: isFilling ? "width 0.1s linear" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
