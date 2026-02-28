import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RainAnimation from '../RainAnimation';

describe('RainAnimation', () => {
  it('renders with default count of 50 droplets', () => {
    const { container } = render(<RainAnimation />);
    const droplets = container.querySelectorAll('.rain-droplet');
    expect(droplets.length).toBe(50);
  });

  it('renders with custom count', () => {
    const { container } = render(<RainAnimation count={75} />);
    const droplets = container.querySelectorAll('.rain-droplet');
    expect(droplets.length).toBe(75);
  });

  it('applies viewport-relative positioning', () => {
    const { container } = render(<RainAnimation count={10} />);
    const droplets = container.querySelectorAll('.rain-droplet');
    
    droplets.forEach((droplet) => {
      const style = (droplet as HTMLElement).style;
      expect(style.left).toMatch(/vw$/);
    });
  });

  it('applies random animation delays and durations', () => {
    const { container } = render(<RainAnimation count={10} />);
    const droplets = container.querySelectorAll('.rain-droplet');
    
    const delays = Array.from(droplets).map(d => (d as HTMLElement).style.animationDelay);
    const durations = Array.from(droplets).map(d => (d as HTMLElement).style.animationDuration);
    
    // Check that not all delays are the same (randomness)
    const uniqueDelays = new Set(delays);
    expect(uniqueDelays.size).toBeGreaterThan(1);
    
    // Check that not all durations are the same (randomness)
    const uniqueDurations = new Set(durations);
    expect(uniqueDurations.size).toBeGreaterThan(1);
  });

  it('adjusts animation duration based on speed prop', () => {
    const { container: container1 } = render(<RainAnimation count={10} speed={1} />);
    const { container: container2 } = render(<RainAnimation count={10} speed={2} />);
    
    const droplets1 = container1.querySelectorAll('.rain-droplet');
    const droplets2 = container2.querySelectorAll('.rain-droplet');
    
    const avgDuration1 = Array.from(droplets1)
      .map(d => parseFloat((d as HTMLElement).style.animationDuration))
      .reduce((a, b) => a + b, 0) / droplets1.length;
    
    const avgDuration2 = Array.from(droplets2)
      .map(d => parseFloat((d as HTMLElement).style.animationDuration))
      .reduce((a, b) => a + b, 0) / droplets2.length;
    
    // Higher speed should result in shorter duration
    expect(avgDuration2).toBeLessThan(avgDuration1);
  });

  it('renders container with correct classes', () => {
    const { container } = render(<RainAnimation />);
    const rainContainer = container.querySelector('.rain-animation');
    expect(rainContainer).toBeInTheDocument();
  });
});
