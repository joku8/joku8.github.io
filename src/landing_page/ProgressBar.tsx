import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  isFilling: boolean;
  onComplete: () => void;
  left: number;
  width: number;
  top: string;
  freeze?: boolean;
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
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (freeze) return;

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

  useEffect(() => {
    if (isComplete) {
      onComplete();
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
      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        Planting Progress
      </div>

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
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
