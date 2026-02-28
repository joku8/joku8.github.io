import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LightningEffect from '../LightningEffect';

describe('LightningEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const { container } = render(<LightningEffect />);
    const lightningDiv = container.querySelector('.lightning-effect');
    expect(lightningDiv).toBeInTheDocument();
  });

  it('initially renders without flash class', () => {
    const { container } = render(<LightningEffect />);
    const lightningDiv = container.querySelector('.lightning-effect');
    expect(lightningDiv).not.toHaveClass('flash');
  });

  it('applies flash class during lightning flash', () => {
    const { container } = render(<LightningEffect minInterval={1000} maxInterval={1000} />);
    const lightningDiv = container.querySelector('.lightning-effect');
    
    // Fast-forward to trigger first flash
    vi.advanceTimersByTime(1000);
    expect(lightningDiv).toHaveClass('flash');
    
    // Fast-forward to end flash
    vi.advanceTimersByTime(200);
    expect(lightningDiv).not.toHaveClass('flash');
  });

  it('flashes at intervals within specified range', () => {
    const { container } = render(<LightningEffect minInterval={3000} maxInterval={8000} />);
    const lightningDiv = container.querySelector('.lightning-effect');
    
    // Advance to minimum interval
    vi.advanceTimersByTime(3000);
    expect(lightningDiv).toHaveClass('flash');
    
    // End flash
    vi.advanceTimersByTime(200);
    expect(lightningDiv).not.toHaveClass('flash');
  });

  it('uses default intervals when not specified', () => {
    const { container } = render(<LightningEffect />);
    const lightningDiv = container.querySelector('.lightning-effect');
    
    // Default minInterval is 3000ms
    vi.advanceTimersByTime(3000);
    expect(lightningDiv).toHaveClass('flash');
  });

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = render(<LightningEffect />);
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('schedules next flash after current flash ends', () => {
    const { container } = render(<LightningEffect minInterval={1000} maxInterval={1000} />);
    const lightningDiv = container.querySelector('.lightning-effect');
    
    // First flash
    vi.advanceTimersByTime(1000);
    expect(lightningDiv).toHaveClass('flash');
    
    // End first flash
    vi.advanceTimersByTime(200);
    expect(lightningDiv).not.toHaveClass('flash');
    
    // Second flash
    vi.advanceTimersByTime(1000);
    expect(lightningDiv).toHaveClass('flash');
  });
});
