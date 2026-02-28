import React, { useMemo } from 'react';
import './SnowAnimation.css';

interface SnowAnimationProps {
  count?: number;
  speed?: number;
}

interface Snowflake {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
  driftDuration: number;
  size: number;
}

const SnowAnimation: React.FC<SnowAnimationProps> = ({ count = 50, speed = 0.5 }) => {
  const snowflakes = useMemo<Snowflake[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: (3 + Math.random() * 2) / speed,
      driftDuration: 3 + Math.random() * 2,
      size: 3 + Math.random() * 4,
    }));
  }, [count, speed]);

  return (
    <div className="snow-animation">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{
            left: `${snowflake.left}vw`,
            animationDelay: `${snowflake.animationDelay}s`,
            animationDuration: `${snowflake.animationDuration}s`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            '--drift-duration': `${snowflake.driftDuration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default SnowAnimation;
