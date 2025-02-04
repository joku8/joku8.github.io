import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  isFilling: boolean;
  onComplete: () => void;
  left: number;
  width: number;
  top: string;
  freeze?: boolean; // New prop to freeze progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  isFilling,
  onComplete,
  left,
  width,
  top,
  freeze = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false); // Local state to track completion

  useEffect(() => {
    if (freeze) return; // Freeze the progress bar if needed

    let interval: ReturnType<typeof setInterval> | null = null;

    if (isFilling && !isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!);
            setIsComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    } else if (!isFilling) {
      setProgress(0);
      setIsComplete(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFilling, freeze, isComplete]);

  // 🔹 Call `onComplete` in `useEffect` to prevent state updates during render
  useEffect(() => {
    if (isComplete) {
      onComplete(); // Notify parent only when progress reaches 100%
    }
  }, [isComplete, onComplete]);

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
            backgroundColor: "#4caf50", // Green when frozen or filling
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
