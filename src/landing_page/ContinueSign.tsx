import React, { useState } from "react";

interface SignProps {
  onClick: () => void;
}

const ContinueSign: React.FC<SignProps> = ({ onClick }) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const signWidth = 0.2 * viewportHeight; // Scales dynamically
  const signHeight = signWidth * 1.2; // Adjust aspect ratio

  const leftPosition = 0.9 * viewportWidth - signWidth / 2; // Center at 90% of viewport width
  const bottomPosition = "8vh"; // Align with the top of the dirt layer

  const [rotation, setRotation] = useState(0);
  const [hasHovered, setHasHovered] = useState(false);

  const handleMouseEnter = () => {
    if (hasHovered) return; // Prevent animation replay during same hover event

    setHasHovered(true);
    let step = 0;
    const wiggleSequence = [-10, 20, -10, 0]; // Rotation degrees

    const animateWiggle = () => {
      if (step < wiggleSequence.length) {
        setRotation(wiggleSequence[step]);
        step++;
        setTimeout(animateWiggle, 375); // 1.5s total duration (375ms per step)
      }
    };

    animateWiggle();
  };

  const handleMouseLeave = () => {
    setHasHovered(false); // Reset so animation can play again next time
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        bottom: bottomPosition,
        left: `${leftPosition}px`,
        width: `${signWidth}px`,
        height: `${signHeight}px`,
        backgroundImage: "url('/artifacts/continue-sign.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        cursor: "pointer",
        transformOrigin: "bottom center", // Rotate from midpoint of bottom edge
        transform: `rotate(${rotation}deg)`,
        transition: "transform 375ms ease-in-out",
      }}
    />
  );
};

export default ContinueSign;