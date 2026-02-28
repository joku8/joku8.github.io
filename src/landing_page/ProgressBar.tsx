import React, { useState, useEffect, useRef, useCallback } from "react";

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
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>();

  const FILL_DURATION = 2000; // 2 seconds to fill

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const newProgress = Math.min((elapsed / FILL_DURATION) * 100, 100);

    setProgress(newProgress);

    if (newProgress < 100) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsComplete(true);
    }
  }, []);

  useEffect(() => {
    if (freeze) return;

    if (isFilling && !isComplete) {
      startTimeRef.current = null;
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (!isFilling) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setProgress(0);
      setIsComplete(false);
      startTimeRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isFilling, freeze, isComplete, animate]);

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
        zIndex: 100,
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
            transition: "none",
            willChange: "width",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
