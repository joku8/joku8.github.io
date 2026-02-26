import React, { useState } from "react";

interface SignProps {
  onClick: () => void;
}

const ContinueSign: React.FC<SignProps> = ({ onClick }) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const signWidth = 0.2 * viewportHeight;
  const signHeight = signWidth * 1.2;

  const leftPosition = 0.9 * viewportWidth - signWidth / 2;
  const bottomPosition = "8vh";

  const [rotation, setRotation] = useState(0);
  const [hasHovered, setHasHovered] = useState(false);

  const handleMouseEnter = () => {
    if (hasHovered) return;

    setHasHovered(true);
    let step = 0;
    const wiggleSequence = [-10, 20, -10, 0];

    const animateWiggle = () => {
      if (step < wiggleSequence.length) {
        setRotation(wiggleSequence[step]);
        step++;
        setTimeout(animateWiggle, 375);
      }
    };

    animateWiggle();
  };

  const handleMouseLeave = () => {
    setHasHovered(false);
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
        transformOrigin: "bottom center",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 375ms ease-in-out",
      }}
    />
  );
};

export default ContinueSign;