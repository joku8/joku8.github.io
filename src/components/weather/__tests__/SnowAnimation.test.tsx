import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SnowAnimation from '../SnowAnimation';

describe('SnowAnimation', () => {
  it('renders without crashing', () => {
    const { container } = render(<SnowAnimation />);
    expect(container.querySelector('.snow-animation')).toBeInTheDocument();
  });

  it('renders default 50 snowflakes', () => {
    const { container } = render(<SnowAnimation />);
    const snowflakes = container.querySelectorAll('.snowflake');
    expect(snowflakes).toHaveLength(50);
  });

  it('renders custom count of snowflakes', () => {
    const { container } = render(<SnowAnimation count={30} />);
    const snowflakes = container.querySelectorAll('.snowflake');
    expect(snowflakes).toHaveLength(30);
  });

  it('applies viewport-relative positioning', () => {
    const { container } = render(<SnowAnimation count={5} />);
    const snowflakes = container.querySelectorAll('.snowflake');
    
    snowflakes.forEach((snowflake) => {
      const left = (snowflake as HTMLElement).style.left;
      expect(left).toMatch(/^\d+(\.\d+)?vw$/);
    });
  });

  it('applies random animation delays', () => {
    const { container } = render(<SnowAnimation count={5} />);
    const snowflakes = container.querySelectorAll('.snowflake');
    
    const delays = Array.from(snowflakes).map(
      (snowflake) => (snowflake as HTMLElement).style.animationDelay
    );
    
    // Check that delays are set
    delays.forEach((delay) => {
      expect(delay).toMatch(/^\d+(\.\d+)?s$/);
    });
  });

  it('applies random sizes to snowflakes', () => {
    const { container } = render(<SnowAnimation count={5} />);
    const snowflakes = container.querySelectorAll('.snowflake');
    
    snowflakes.forEach((snowflake) => {
      const width = (snowflake as HTMLElement).style.width;
      const height = (snowflake as HTMLElement).style.height;
      expect(width).toMatch(/^\d+(\.\d+)?px$/);
      expect(height).toMatch(/^\d+(\.\d+)?px$/);
      expect(width).toBe(height); // Should be circular
    });
  });

  it('applies drift duration CSS variable', () => {
    const { container } = render(<SnowAnimation count={5} />);
    const snowflakes = container.querySelectorAll('.snowflake');
    
    snowflakes.forEach((snowflake) => {
      const driftDuration = (snowflake as HTMLElement).style.getPropertyValue('--drift-duration');
      expect(driftDuration).toMatch(/^\d+(\.\d+)?s$/);
    });
  });

  it('respects speed parameter', () => {
    const { container } = render(<SnowAnimation count={5} speed={2} />);
    const snowflakes = container.querySelectorAll('.snowflake');
    
    snowflakes.forEach((snowflake) => {
      const duration = (snowflake as HTMLElement).style.animationDuration;
      expect(duration).toMatch(/^\d+(\.\d+)?s$/);
    });
  });
});
