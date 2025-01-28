import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  isFilling: boolean; // Whether the progress bar is actively filling
  onComplete: () => void; // Callback when the progress bar completes
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isFilling, onComplete }) => {
  const [progress, setProgress] = useState(0); // Progress percentage (0 to 100)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isFilling) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!);
            onComplete();
            return 100;
          }
          return prev + 5; // Fills over 5 seconds (100 / 2 = 50 iterations, 100ms each)
        });
      }, 100);
    } else {
      setProgress(0); // Reset progress when not filling
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFilling, onComplete]);

  return (
    <div
      style={{
        position: "absolute",
        top: 20, // Top center
        left: "15%", // Starts from 12.5% to make it centered in the middle 75%
        width: "70%",
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
          backgroundColor: "#4caf50", // Green progress bar
          transition: isFilling ? "width 0.1s linear" : "none",
        }}
      />
    </div>
  );
};

export default ProgressBar;
