import React, { useEffect, useState } from 'react';
import './LightningEffect.css';

interface LightningEffectProps {
  minInterval?: number;
  maxInterval?: number;
}

const LightningEffect: React.FC<LightningEffectProps> = ({ 
  minInterval = 3000, 
  maxInterval = 8000 
}) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let flashTimeoutId: NodeJS.Timeout;

    const scheduleNextFlash = () => {
      const interval = minInterval + Math.random() * (maxInterval - minInterval);
      timeoutId = setTimeout(() => {
        setIsFlashing(true);
        flashTimeoutId = setTimeout(() => {
          setIsFlashing(false);
          scheduleNextFlash();
        }, 200); // Flash duration: 200ms
      }, interval);
    };

    scheduleNextFlash();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(flashTimeoutId);
    };
  }, [minInterval, maxInterval]);

  return (
    <div className={`lightning-effect ${isFlashing ? 'flash' : ''}`} />
  );
};

export default LightningEffect;
