import React, { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  hideCursor?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 200,
  onComplete,
  showCursor = true,
  hideCursor = false,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!hasCompleted.current) {
      hasCompleted.current = true;
      if (onComplete) onComplete();
    }
  }, [index, text, speed, onComplete]);

  useEffect(() => {
    if (!hideCursor) {
      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    } else {
      setCursorVisible(false);
    }
  }, [hideCursor]);

  return (
    <span>
      {displayText}
      {showCursor && cursorVisible && !hideCursor ? "|" : ""}
    </span>
  );
};

export default Typewriter;
