import React, { useMemo } from 'react';
import './RainAnimation.css';

interface RainAnimationProps {
  count?: number;
  speed?: number;
}

interface Droplet {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

const RainAnimation: React.FC<RainAnimationProps> = ({ count = 50, speed = 1 }) => {
  const droplets = useMemo<Droplet[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: (1 + Math.random() * 0.5) / speed,
    }));
  }, [count, speed]);

  return (
    <div className="rain-animation">
      {droplets.map((droplet) => (
        <div
          key={droplet.id}
          className="rain-droplet"
          style={{
            left: `${droplet.left}vw`,
            animationDelay: `${droplet.animationDelay}s`,
            animationDuration: `${droplet.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default RainAnimation;
