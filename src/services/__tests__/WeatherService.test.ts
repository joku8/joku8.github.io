import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WeatherService, WeatherData } from '../WeatherService';

describe('WeatherService - Cache Management', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('setCachedWeather and getCachedWeather', () => {
    it('should store and retrieve weather data from cache', () => {
      const mockWeatherData: WeatherData = {
        condition: 'sunny',
        temperature: 75,
        timestamp: Date.now(),
        description: 'Clear sky'
      };

      // Access private methods via type assertion for testing
      const service = WeatherService as any;
      
      // Store data in cache
      service.setCachedWeather(mockWeatherData);

      // Retrieve data from cache
      const cachedData = service.getCachedWeather();

      expect(cachedData).toEqual(mockWeatherData);
    });

    it('should return null when cache is empty', () => {
      const service = WeatherService as any;
      const cachedData = service.getCachedWeather();

      expect(cachedData).toBeNull();
    });

    it('should return null when cache is expired', () => {
      const mockWeatherData: WeatherData = {
        condition: 'rainy',
        temperature: 60,
        timestamp: Date.now(),
        description: 'Light rain'
      };

      const service = WeatherService as any;
      
      // Manually set expired cache
      const expiredCache = {
        data: mockWeatherData,
        expiresAt: Date.now() - 1000 // Expired 1 second ago
      };
      localStorage.setItem('weather_cache', JSON.stringify(expiredCache));

      const cachedData = service.getCachedWeather();

      expect(cachedData).toBeNull();
      // Verify expired cache was removed
      expect(localStorage.getItem('weather_cache')).toBeNull();
    });

    it('should return null when cache data is corrupted', () => {
      const service = WeatherService as any;
      
      // Set invalid JSON in cache
      localStorage.setItem('weather_cache', 'invalid json');

      const cachedData = service.getCachedWeather();

      expect(cachedData).toBeNull();
    });

    it('should return null when cache structure is invalid', () => {
      const service = WeatherService as any;
      
      // Set cache with missing fields
      localStorage.setItem('weather_cache', JSON.stringify({ data: null }));

      const cachedData = service.getCachedWeather();

      expect(cachedData).toBeNull();
    });

    it('should handle localStorage unavailability gracefully when setting cache', () => {
      const service = WeatherService as any;
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Mock localStorage.setItem to throw error
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      const mockWeatherData: WeatherData = {
        condition: 'cloudy',
        temperature: 65,
        timestamp: Date.now(),
        description: 'Overcast'
      };

      // Should not throw error
      expect(() => service.setCachedWeather(mockWeatherData)).not.toThrow();
      expect(consoleWarnSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it('should handle localStorage unavailability gracefully when getting cache', () => {
      const service = WeatherService as any;
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Mock localStorage.getItem to throw error
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });

      const cachedData = service.getCachedWeather();

      expect(cachedData).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalled();

      getItemSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it('should set cache with 30-minute TTL', () => {
      const mockWeatherData: WeatherData = {
        condition: 'snowy',
        temperature: 28,
        timestamp: Date.now(),
        description: 'Light snow'
      };

      const service = WeatherService as any;
      const now = Date.now();
      vi.spyOn(Date, 'now').mockReturnValue(now);

      service.setCachedWeather(mockWeatherData);

      const cachedString = localStorage.getItem('weather_cache');
      expect(cachedString).not.toBeNull();

      const cached = JSON.parse(cachedString!);
      const expectedExpiration = now + (30 * 60 * 1000); // 30 minutes

      expect(cached.expiresAt).toBe(expectedExpiration);
      expect(cached.data).toEqual(mockWeatherData);

      vi.restoreAllMocks();
    });
  });
});

describe('WeatherService - Weather Categorization', () => {
  const service = WeatherService as any;

  describe('categorizeWeather', () => {
    it('should categorize clear skies (code 800) as sunny', () => {
      const apiResponse = {
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        clouds: { all: 0 },
        visibility: 10000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should categorize clouds >50% (codes 801-804) as cloudy', () => {
      const testCases = [
        { code: 801, clouds: 51 },
        { code: 802, clouds: 75 },
        { code: 803, clouds: 90 },
        { code: 804, clouds: 100 }
      ];

      testCases.forEach(({ code, clouds }) => {
        const apiResponse = {
          weather: [{ id: code, main: 'Clouds', description: 'cloudy', icon: '02d' }],
          clouds: { all: clouds },
          visibility: 10000
        };

        const condition = service.categorizeWeather(apiResponse);
        expect(condition).toBe('cloudy');
      });
    });

    it('should categorize rain (codes 500-531) as rainy', () => {
      const testCases = [500, 501, 502, 520, 521, 531];

      testCases.forEach(code => {
        const apiResponse = {
          weather: [{ id: code, main: 'Rain', description: 'rain', icon: '10d' }],
          clouds: { all: 80 },
          visibility: 5000
        };

        const condition = service.categorizeWeather(apiResponse);
        expect(condition).toBe('rainy');
      });
    });

    it('should categorize snow (codes 600-622) as snowy', () => {
      const testCases = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];

      testCases.forEach(code => {
        const apiResponse = {
          weather: [{ id: code, main: 'Snow', description: 'snow', icon: '13d' }],
          clouds: { all: 90 },
          visibility: 3000
        };

        const condition = service.categorizeWeather(apiResponse);
        expect(condition).toBe('snowy');
      });
    });

    it('should categorize low visibility <1km as foggy', () => {
      const apiResponse = {
        weather: [{ id: 701, main: 'Mist', description: 'mist', icon: '50d' }],
        clouds: { all: 40 },
        visibility: 500
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('foggy');
    });

    it('should categorize thunderstorms (codes 200-232) as stormy', () => {
      const testCases = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];

      testCases.forEach(code => {
        const apiResponse = {
          weather: [{ id: code, main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' }],
          clouds: { all: 100 },
          visibility: 8000
        };

        const condition = service.categorizeWeather(apiResponse);
        expect(condition).toBe('stormy');
      });
    });

    it('should prioritize thunderstorm over other conditions', () => {
      const apiResponse = {
        weather: [{ id: 230, main: 'Thunderstorm', description: 'thunderstorm with drizzle', icon: '11d' }],
        clouds: { all: 100 },
        visibility: 500 // Low visibility, but thunderstorm takes priority
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('stormy');
    });

    it('should prioritize snow over rain', () => {
      const apiResponse = {
        weather: [{ id: 600, main: 'Snow', description: 'light snow', icon: '13d' }],
        clouds: { all: 80 },
        visibility: 5000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('snowy');
    });

    it('should prioritize rain over fog', () => {
      const apiResponse = {
        weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
        clouds: { all: 70 },
        visibility: 800 // Low visibility, but rain takes priority
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('rainy');
    });

    it('should default to sunny for clouds ≤50%', () => {
      const apiResponse = {
        weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
        clouds: { all: 25 },
        visibility: 10000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should default to sunny for visibility ≥1km with clear code', () => {
      const apiResponse = {
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        clouds: { all: 0 },
        visibility: 1000 // Exactly 1km
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should handle missing visibility field (default to 10km)', () => {
      const apiResponse = {
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        clouds: { all: 0 }
        // visibility field missing
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should handle missing clouds field (default to 0%)', () => {
      const apiResponse = {
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        visibility: 10000
        // clouds field missing
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should return sunny for invalid API response (null)', () => {
      const condition = service.categorizeWeather(null);
      expect(condition).toBe('sunny');
    });

    it('should return sunny for invalid API response (undefined)', () => {
      const condition = service.categorizeWeather(undefined);
      expect(condition).toBe('sunny');
    });

    it('should return sunny for missing weather array', () => {
      const apiResponse = {
        clouds: { all: 50 },
        visibility: 10000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should return sunny for empty weather array', () => {
      const apiResponse = {
        weather: [],
        clouds: { all: 50 },
        visibility: 10000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should return sunny for non-array weather field', () => {
      const apiResponse = {
        weather: 'not an array',
        clouds: { all: 50 },
        visibility: 10000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should handle unrecognized weather codes by defaulting to sunny', () => {
      const apiResponse = {
        weather: [{ id: 999, main: 'Unknown', description: 'unknown', icon: '01d' }],
        clouds: { all: 30 },
        visibility: 10000
      };

      const condition = service.categorizeWeather(apiResponse);
      expect(condition).toBe('sunny');
    });

    it('should handle errors gracefully and return sunny', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Create an object that throws when accessing properties
      const problematicResponse = {
        get weather() {
          throw new Error('Property access error');
        }
      };

      const condition = service.categorizeWeather(problematicResponse);
      expect(condition).toBe('sunny');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });
});
