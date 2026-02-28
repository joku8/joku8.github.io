import React from 'react';
import { WeatherCondition } from '../../services/WeatherService';
import RainAnimation from './RainAnimation';
import SnowAnimation from './SnowAnimation';
import LightningEffect from './LightningEffect';

interface WeatherVisualizerProps {
  condition: WeatherCondition;
  viewportWidth: number;
  viewportHeight: number;
  fadeOut: boolean;
}

interface WeatherAssetConfig {
  type: 'sun' | 'cloud' | 'dark-cloud';
  position: { top: string; left: string };
  opacity?: number;
}

interface AnimationConfig {
  type: 'rain' | 'snow' | 'lightning';
  count?: number;
  speed?: number;
  minInterval?: number;
  maxInterval?: number;
}

interface WeatherConfig {
  skyColor: string;
  assets: WeatherAssetConfig[];
  animations: AnimationConfig[];
  sunVisible: boolean;
  sunOpacity: number;
}

/**
 * Weather configuration object mapping conditions to visual elements
 * Defines sky colors, asset positions, and animations for each weather type
 */
const WEATHER_CONFIGS: Record<WeatherCondition, WeatherConfig> = {
  sunny: {
    skyColor: '#87ceeb',
    assets: [],
    animations: [],
    sunVisible: true,
    sunOpacity: 1.0
  },
  cloudy: {
    skyColor: '#b0c4de',
    assets: [
      { type: 'cloud', position: { top: '10vh', left: '20vw' } },
      { type: 'cloud', position: { top: '15vh', left: '50vw' } },
      { type: 'cloud', position: { top: '8vh', left: '75vw' } }
    ],
    animations: [],
    sunVisible: false,
    sunOpacity: 0.3
  },
  rainy: {
    skyColor: '#778899',
    assets: [
      { type: 'cloud', position: { top: '5vh', left: '25vw' } },
      { type: 'cloud', position: { top: '10vh', left: '60vw' } }
    ],
    animations: [{ type: 'rain', count: 50, speed: 1 }],
    sunVisible: false,
    sunOpacity: 0
  },
  snowy: {
    skyColor: '#d3d3d3',
    assets: [
      { type: 'cloud', position: { top: '5vh', left: '30vw' } },
      { type: 'cloud', position: { top: '12vh', left: '65vw' } }
    ],
    animations: [{ type: 'snow', count: 50, speed: 0.5 }],
    sunVisible: false,
    sunOpacity: 0
  },
  foggy: {
    skyColor: '#c0c0c0',
    assets: [],
    animations: [],
    sunVisible: true,
    sunOpacity: 0.5
  },
  stormy: {
    skyColor: '#4a5568',
    assets: [
      { type: 'dark-cloud', position: { top: '5vh', left: '20vw' } },
      { type: 'dark-cloud', position: { top: '10vh', left: '55vw' } }
    ],
    animations: [
      { type: 'rain', count: 50, speed: 1.5 },
      { type: 'lightning', minInterval: 3000, maxInterval: 8000 }
    ],
    sunVisible: false,
    sunOpacity: 0
  }
};

/**
 * WeatherVisualizer Component
 * 
 * Orchestrates weather visualizations based on current weather conditions.
 * Renders sky background, weather assets (sun, clouds), and animations (rain, snow, lightning).
 * 
 * @param condition - Current weather condition (sunny, cloudy, rainy, snowy, foggy, stormy)
 * @param viewportWidth - Current viewport width in pixels
 * @param viewportHeight - Current viewport height in pixels
 * @param fadeOut - Whether the component should fade out (for transitions)
 */
const WeatherVisualizer: React.FC<WeatherVisualizerProps> = ({
  condition,
  viewportWidth,
  viewportHeight,
  fadeOut
}) => {
  // Get configuration for current weather condition
  const config = WEATHER_CONFIGS[condition];

  return (
    <>
      {/* Sky background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: config.skyColor,
          transition: 'background-color 2s ease-in-out',
          zIndex: 0,
          opacity: fadeOut ? 0 : 1
        }}
      />
      
      {/* Sun asset */}
      {config.sunVisible && (
        <img
          src="/artifacts/sun.png"
          alt="Sun"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '12vw',
            height: 'auto',
            opacity: fadeOut ? 0 : config.sunOpacity,
            transition: 'opacity 1s ease-in-out',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Cloud assets */}
      {config.assets.map((asset, index) => (
        <img
          key={`${asset.type}-${index}`}
          src={`/artifacts/${asset.type}.png`}
          alt={asset.type === 'dark-cloud' ? 'Dark Cloud' : 'Cloud'}
          style={{
            position: 'fixed',
            top: asset.position.top,
            left: asset.position.left,
            width: '15vw',
            height: 'auto',
            opacity: fadeOut ? 0 : (asset.opacity ?? 1),
            transition: 'opacity 1s ease-in-out',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {/* Weather animations (rain, snow, lightning) */}
      {config.animations.map((animation, index) => {
        if (animation.type === 'rain') {
          return (
            <RainAnimation
              key={`rain-${index}`}
              count={animation.count || 50}
              speed={animation.speed || 1}
            />
          );
        }
        if (animation.type === 'snow') {
          return (
            <SnowAnimation
              key={`snow-${index}`}
              count={animation.count || 50}
              speed={animation.speed || 0.5}
            />
          );
        }
        if (animation.type === 'lightning') {
          return (
            <LightningEffect
              key={`lightning-${index}`}
              minInterval={animation.minInterval || 3000}
              maxInterval={animation.maxInterval || 8000}
            />
          );
        }
        return null;
      })}
      
      {/* Foggy weather overlay */}
      {condition === 'foggy' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            opacity: fadeOut ? 0 : 0.6,
            transition: 'opacity 1s ease-in-out',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
};

export default WeatherVisualizer;
