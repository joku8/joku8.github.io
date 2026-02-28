/**
 * WeatherService - Handles fetching and caching weather data from OpenWeatherMap API
 */

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'stormy';

export interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  timestamp: number;
  description: string;
}

export interface WeatherCache {
  data: WeatherData;
  expiresAt: number;
}

export class WeatherService {
  private static readonly API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  private static readonly API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private static readonly LOCATION = 'Des Moines,IA,US';
  private static readonly CACHE_KEY = 'weather_cache';
  private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  private static readonly TIMEOUT = 5000; // 5 seconds in milliseconds

  /**
   * Fetches current weather data for Des Moines, IA
   * Returns cached data if available and not expired
   * Falls back to default sunny weather on any error
   */
  static async fetchWeather(): Promise<WeatherData> {
    // Check cache first
    const cachedWeather = this.getCachedWeather();
    if (cachedWeather) {
      return cachedWeather;
    }

    // Set up timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    try {
      // Build API URL with query parameters
      const url = new URL(this.API_URL);
      url.searchParams.append('q', this.LOCATION);
      url.searchParams.append('appid', this.API_KEY);
      url.searchParams.append('units', 'imperial');

      // Make API call with timeout
      const response = await fetch(url.toString(), {
        signal: controller.signal
      });

      // Clear timeout on successful response
      clearTimeout(timeoutId);

      // Check for API errors
      if (!response.ok) {
        console.error(`Weather API error: ${response.status} ${response.statusText}`);
        return this.getDefaultWeather();
      }

      // Parse response
      const apiResponse = await response.json();

      // Categorize weather and build WeatherData
      const weatherData: WeatherData = {
        condition: this.categorizeWeather(apiResponse),
        temperature: apiResponse.main?.temp || 72,
        timestamp: Date.now(),
        description: apiResponse.weather?.[0]?.description || 'Clear sky'
      };

      // Cache the result
      this.setCachedWeather(weatherData);

      return weatherData;
    } catch (error) {
      // Clear timeout on error
      clearTimeout(timeoutId);

      // Log error to console
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Weather API request timed out after 5 seconds');
        } else {
          console.error('Weather API network error:', error.message);
        }
      } else {
        console.error('Weather API error:', error);
      }

      // Return default sunny weather on any error
      return this.getDefaultWeather();
    }
  }

  /**
   * Retrieves cached weather data from localStorage
   * Returns null if cache is expired or invalid
   */
  private static getCachedWeather(): WeatherData | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) {
        return null;
      }

      const weatherCache: WeatherCache = JSON.parse(cached);
      
      // Validate cache structure
      if (!weatherCache.data || !weatherCache.expiresAt) {
        return null;
      }

      // Check if cache has expired
      if (Date.now() > weatherCache.expiresAt) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return weatherCache.data;
    } catch (error) {
      // Handle localStorage unavailability or JSON parse errors
      console.warn('Failed to retrieve cached weather data:', error);
      return null;
    }
  }

  /**
   * Stores weather data in localStorage with expiration timestamp
   */
  private static setCachedWeather(data: WeatherData): void {
    try {
      const weatherCache: WeatherCache = {
        data,
        expiresAt: Date.now() + this.CACHE_DURATION
      };
      
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(weatherCache));
    } catch (error) {
      // Handle localStorage unavailability (e.g., private browsing, quota exceeded)
      console.warn('Failed to cache weather data:', error);
    }
  }

  /**
   * Maps OpenWeatherMap API response to one of six weather categories
   */
  private static categorizeWeather(apiResponse: any): WeatherCondition {
    try {
      // Validate API response structure
      if (!apiResponse || !apiResponse.weather || !Array.isArray(apiResponse.weather) || apiResponse.weather.length === 0) {
        return 'sunny';
      }

      const weatherCode = apiResponse.weather[0].id;
      const visibility = apiResponse.visibility || 10000; // Default to 10km if missing
      const cloudCoverage = apiResponse.clouds?.all || 0;

      // Priority order: thunderstorm > snow > rain > fog > cloudy > clear

      // Thunderstorms (codes 200-232) → stormy
      if (weatherCode >= 200 && weatherCode <= 232) {
        return 'stormy';
      }

      // Snow (codes 600-622) → snowy
      if (weatherCode >= 600 && weatherCode <= 622) {
        return 'snowy';
      }

      // Rain (codes 500-531) → rainy
      if (weatherCode >= 500 && weatherCode <= 531) {
        return 'rainy';
      }

      // Low visibility <1km (1000 meters) → foggy
      if (visibility < 1000) {
        return 'foggy';
      }

      // Clouds >50% (codes 801-804) → cloudy
      if (cloudCoverage > 50 && weatherCode >= 801 && weatherCode <= 804) {
        return 'cloudy';
      }

      // Clear skies (code 800) → sunny
      if (weatherCode === 800) {
        return 'sunny';
      }

      // Default to sunny for any unhandled cases
      return 'sunny';
    } catch (error) {
      console.warn('Error categorizing weather, defaulting to sunny:', error);
      return 'sunny';
    }
  }

  /**
   * Returns default weather data (sunny condition)
   * Used as fallback when API calls fail
   */
  private static getDefaultWeather(): WeatherData {
    return {
      condition: 'sunny',
      temperature: 72,
      timestamp: Date.now(),
      description: 'Clear sky'
    };
  }
}
