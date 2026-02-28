import React, { useState, useMemo, useCallback } from "react";

interface SignProps {
  onClick: () => void;
}

const ContinueSign: React.FC<SignProps> = ({ onClick }) => {
  const layout = useMemo(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const signWidth = 0.2 * viewportHeight;
    const signHeight = signWidth * 1.2;
    const leftPosition = viewportWidth - signWidth - 50; // Position near right edge with 50px margin
    
    return { signWidth, signHeight, leftPosition };
  }, []);

  const [rotation, setRotation] = useState(0);
  const [hasHovered, setHasHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (hasHovered) return;

    setHasHovered(true);
    const wiggleSequence = [-10, 20, -10, 0];
    
    wiggleSequence.forEach((angle, index) => {
      setTimeout(() => setRotation(angle), index * 300);
    });
  }, [hasHovered]);

  const handleMouseLeave = useCallback(() => {
    setHasHovered(false);
  }, []);

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        bottom: "8vh",
        left: `${layout.leftPosition}px`,
        width: `${layout.signWidth}px`,
        height: `${layout.signHeight}px`,
        backgroundImage: "url('/artifacts/continue-sign.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        cursor: "pointer",
        transformOrigin: "bottom center",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        willChange: "transform",
        zIndex: 100,
      }}
    />
  );
};

export default ContinueSign;