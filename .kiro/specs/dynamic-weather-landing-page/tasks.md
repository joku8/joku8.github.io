# Implementation Plan: Dynamic Weather Landing Page

## Overview

This implementation plan breaks down the dynamic weather landing page feature into discrete coding tasks. The feature integrates real-time weather visualization into the existing garden-themed landing page by fetching weather data from OpenWeatherMap API and dynamically rendering weather-specific visual elements.

The implementation follows a layered approach:
1. Create the weather service for data fetching and caching
2. Build weather visualization components with animations
3. Integrate weather system into existing LandingPage component
4. Add comprehensive testing

All tasks build incrementally, with each step validating functionality through code before proceeding.

## Tasks

- [ ] 1. Set up weather service infrastructure
  - [x] 1.1 Create WeatherService with TypeScript interfaces
    - Create `src/services/WeatherService.ts`
    - Define `WeatherData`, `WeatherCondition`, `WeatherCache` interfaces
    - Implement basic service class structure with constants (API_URL, LOCATION, CACHE_KEY, etc.)
    - Add environment variable access for `VITE_WEATHER_API_KEY`
    - _Requirements: 1.1, 1.4_

  - [x] 1.2 Implement cache management methods
    - Implement `getCachedWeather()` method with localStorage access
    - Implement `setCachedWeather()` method with 30-minute TTL
    - Add cache validation logic (check expiration timestamp)
    - Handle localStorage unavailability with try-catch
    - _Requirements: 1.5_

  - [ ]* 1.3 Write property test for cache consistency
    - **Property 3: Cache Consistency**
    - **Validates: Requirements 1.5**

- [ ] 2. Implement weather data fetching and categorization
  - [x] 2.1 Implement fetchWeather method with error handling
    - Add fetch call to OpenWeatherMap API with query parameters
    - Implement 5-second timeout using AbortController
    - Add try-catch for network errors
    - Return default sunny weather on any error
    - Log errors to console
    - _Requirements: 1.2, 1.3, 11.1, 11.2, 11.3, 11.4_

  - [x] 2.2 Implement weather categorization logic
    - Create `categorizeWeather()` method
    - Map API weather codes to six categories (sunny, cloudy, rainy, snowy, foggy, stormy)
    - Handle clear skies (code 800) → sunny
    - Handle clouds >50% (codes 801-804) → cloudy
    - Handle rain (codes 500-531) → rainy
    - Handle snow (codes 600-622) → snowy
    - Handle low visibility <1km → foggy
    - Handle thunderstorms (codes 200-232) → stormy
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 2.3 Write property test for error resilience
    - **Property 1: Error Resilience - Default to Sunny**
    - **Validates: Requirements 1.3, 11.2, 11.3, 11.4**

  - [ ]* 2.4 Write property test for data structure completeness
    - **Property 2: Weather Data Structure Completeness**
    - **Validates: Requirements 1.4**

  - [ ]* 2.5 Write property test for categorization validity
    - **Property 4: Weather Categorization Validity**
    - **Validates: Requirements 2.1**

  - [ ]* 2.6 Write unit tests for WeatherService
    - Test successful API call returns correct data structure
    - Test each weather code mapping (clear→sunny, rain→rainy, etc.)
    - Test network error returns default sunny
    - Test timeout returns default sunny
    - Test invalid response returns default sunny
    - Test cache hit within 30 minutes
    - Test cache miss after 30 minutes
    - _Requirements: 1.2, 1.3, 1.5, 2.1-2.7, 11.2-11.4_

- [x] 3. Checkpoint - Verify weather service functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Create weather animation components
  - [x] 4.1 Implement RainAnimation component
    - Create `src/components/weather/RainAnimation.tsx`
    - Generate 50+ rain droplets with random positions
    - Implement CSS animation for falling effect
    - Use viewport-relative positioning (vh, vw)
    - Add configurable fall speed prop
    - _Requirements: 5.3, 5.4_

  - [x] 4.2 Implement SnowAnimation component
    - Create `src/components/weather/SnowAnimation.tsx`
    - Generate 50+ snowflakes with random positions
    - Implement CSS animation with slower fall speed than rain
    - Use viewport-relative positioning
    - Add gentle horizontal drift animation
    - _Requirements: 6.3, 6.4_

  - [ ]* 4.3 Write property test for snow vs rain speed
    - **Property 5: Snow Falls Slower Than Rain**
    - **Validates: Requirements 6.4**

  - [x] 4.4 Implement LightningEffect component
    - Create `src/components/weather/LightningEffect.tsx`
    - Implement white overlay flash effect
    - Add random interval logic (3-8 seconds)
    - Use CSS transitions for flash animation
    - _Requirements: 8.4_

  - [ ]* 4.5 Write property test for lightning intervals
    - **Property 6: Lightning Interval Bounds**
    - **Validates: Requirements 8.4**

  - [ ]* 4.6 Write unit tests for animation components
    - Test RainAnimation renders correct number of droplets
    - Test SnowAnimation renders correct number of snowflakes
    - Test LightningEffect flashes within interval bounds
    - _Requirements: 5.4, 6.3, 6.4, 8.4_

- [ ] 5. Build WeatherVisualizer component
  - [x] 5.1 Create WeatherVisualizer component structure
    - Create `src/components/weather/WeatherVisualizer.tsx`
    - Define `WeatherVisualizerProps` interface
    - Create weather configuration object mapping conditions to visuals
    - Implement component skeleton with props destructuring
    - _Requirements: 3.1-8.5_

  - [x] 5.2 Implement sky background rendering
    - Add dynamic background color based on weather condition
    - Implement CSS transition for smooth color changes (2 seconds)
    - Map each condition to correct sky color (sunny→#87ceeb, cloudy→#b0c4de, etc.)
    - _Requirements: 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1_

  - [x] 5.3 Implement weather asset rendering
    - Add sun asset rendering with conditional visibility and opacity
    - Add cloud asset rendering with multiple positioned clouds
    - Add dark cloud assets for stormy conditions
    - Use viewport-relative positioning (vh, vw, %)
    - Implement fade in/out transitions (1 second)
    - _Requirements: 3.2, 3.3, 4.2, 4.3, 4.4, 5.2, 5.5, 6.2, 6.5, 7.2, 7.3, 8.2, 8.5, 9.2, 9.3, 12.1, 12.2, 12.3_

  - [x] 5.4 Integrate animation components
    - Conditionally render RainAnimation for rainy and stormy conditions
    - Conditionally render SnowAnimation for snowy conditions
    - Conditionally render LightningEffect for stormy conditions
    - Pass appropriate props to animation components
    - _Requirements: 5.3, 5.4, 6.3, 6.4, 8.3, 8.4_

  - [x] 5.5 Add foggy weather overlay
    - Implement semi-transparent white overlay (opacity 0.6)
    - Ensure foreground elements remain visible
    - _Requirements: 7.2, 7.4_

  - [ ]* 5.6 Write property test for responsive asset scaling
    - **Property 7: Responsive Asset Scaling**
    - **Validates: Requirements 10.1**

  - [ ]* 5.7 Write unit tests for WeatherVisualizer
    - Test each weather condition renders correct background color
    - Test sunny displays sun at correct position
    - Test cloudy displays 3+ clouds
    - Test rainy displays rain animation
    - Test snowy displays snow animation
    - Test foggy displays overlay
    - Test stormy displays dark clouds, rain, and lightning
    - Test transitions animate correctly
    - _Requirements: 3.1-8.5, 9.1-9.3_

- [x] 6. Checkpoint - Verify weather visualization components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Integrate weather system into LandingPage
  - [x] 7.1 Modify LandingPage component to use weather service
    - Import WeatherService and WeatherVisualizer
    - Add state for weather condition using useState
    - Call WeatherService.fetchWeather() in useEffect on mount
    - Update weather condition state with fetched data
    - Pass weather condition to WeatherVisualizer
    - _Requirements: 1.2, 11.5_

  - [x] 7.2 Integrate WeatherVisualizer into LandingPage layout
    - Position WeatherVisualizer as background layer
    - Ensure existing elements (typewriter, seed stack, progress bar) render on top
    - Maintain existing fadeOut transition behavior
    - Pass viewport dimensions and fadeOut state to WeatherVisualizer
    - _Requirements: 9.4, 11.5_

  - [x] 7.3 Preserve responsive behavior
    - Ensure mobile viewport (<768px) bypasses weather visualization
    - Maintain existing mobile behavior (skip landing page)
    - Test weather visualization doesn't break mobile layout
    - _Requirements: 10.2, 10.3_

  - [ ]* 7.4 Write property test for UI resilience
    - **Property 8: UI Resilience to Weather Service State**
    - **Validates: Requirements 11.5**

  - [ ]* 7.5 Write integration tests for LandingPage
    - Test LandingPage renders with weather service loading
    - Test LandingPage renders with weather service error
    - Test LandingPage renders with weather service success
    - Test all core UI elements present regardless of weather state
    - Test fadeOut transition still works
    - Test mobile viewport bypasses weather
    - _Requirements: 9.4, 10.2, 10.3, 11.5_

- [ ] 8. Add weather assets to public directory
  - [x] 8.1 Verify and organize weather assets
    - Confirm sun.png exists in `/public/artifacts/`
    - Confirm cloud.png exists in `/public/artifacts/`
    - Confirm dark-cloud.png exists in `/public/artifacts/`
    - Add fallback CSS if any assets are missing
    - _Requirements: 12.1, 12.2, 12.3, 12.5_

- [ ] 9. Final integration and polish
  - [x] 9.1 Test all weather conditions end-to-end
    - Manually test sunny condition rendering
    - Manually test cloudy condition rendering
    - Manually test rainy condition rendering
    - Manually test snowy condition rendering
    - Manually test foggy condition rendering
    - Manually test stormy condition rendering
    - _Requirements: 3.1-8.5_

  - [x] 9.2 Verify smooth transitions between conditions
    - Test transitions between all condition pairs
    - Verify 2-second background color transitions
    - Verify 1-second asset fade in/out
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 9.3 Test responsive behavior across viewports
    - Test on desktop resolutions (1920x1080, 2560x1440)
    - Test on mobile viewports (<768px)
    - Verify asset scaling is proportional
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 9.4 Verify error handling with live API
    - Test with valid API key and live weather data
    - Test with missing API key (should default to sunny)
    - Test with network disconnected (should default to sunny)
    - Verify cache works (check network tab for single request)
    - Test cache expiration after 30 minutes
    - _Requirements: 1.3, 1.5, 11.1, 11.2, 11.3, 11.4_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at reasonable breaks
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- OpenWeatherMap API key should already be in `.env` as `VITE_WEATHER_API_KEY`
- Cloud assets should already exist in `/public/artifacts/`
- All work should be done in a separate branch as requested by user
- Implementation uses TypeScript and React with existing project structure
