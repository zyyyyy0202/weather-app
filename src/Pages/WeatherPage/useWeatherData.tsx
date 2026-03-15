import { useState, useEffect } from "react";
import type { WeatherDataVO } from "../../interface/WeatherInterface";
import {
  getCurrentWeather,
  addWeatherHistory,
  getWeatherHistory,
  deleteWeatherHistory,
} from "../../services/weather";

// Minimum loading duration in milliseconds, prevent loading status flicker
const MIN_LOADING_DURATION = 300;

export const useWeatherData = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataVO | null>(null);
  const [weatherHistoryList, setWeatherHistoryList] = useState<WeatherDataVO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryInitialized, setIsHistoryInitialized] = useState(false);

  const fetchWeatherHistory = () => {
    const history = getWeatherHistory();
    setWeatherHistoryList(history);
    return history;
  };

  /*
   * Search for the weather data of the given city and country.
   * example for init page this action will not save the history.
   */
  const handleSearchWeather = async (
    city: string,
    country: string,
    shouldSaveHistory: boolean = true,
  ) => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();
    
    if (!trimmedCity && !trimmedCountry) {
      setError("Please enter a city or country.");
      return;
    }

    setLoading(true);
    setError(null);
    const startTime = Date.now();
    let result: WeatherDataVO | null = null;

    try {
      result = await getCurrentWeather(trimmedCity, trimmedCountry);
      if (shouldSaveHistory && result?.id) {
        addWeatherHistory(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      /*
       * This is to ensure that the loading status is visible for at least MIN_LOADING_DURATION.
       */
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADING_DURATION - elapsedTime;

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }
      setLoading(false);
      if(result?.id) {
        setWeatherData(result);
        fetchWeatherHistory();
      }
    }
  };

  const handleDeleteWeatherHistory = async (id: string) => {
    await deleteWeatherHistory(id);
    fetchWeatherHistory();
  };

  useEffect(() => {
    /*
     * Initialize the weather data by fetching the latest search history
     * and performing a search for the latest location.
     * if there is no latest location, then perform a search for Johor Bahru, Malaysia.
     */
    const init = async () => {
      const history = fetchWeatherHistory();
      const city = history[0]?.location || "Johor Bahru";
      const country = history[0]?.countryCode || "Malaysia";

      await handleSearchWeather(city, country, false);
      setIsHistoryInitialized(true);
    };
    init();
  }, []);

  return {
    loading,
    weatherData,
    error,
    weatherHistoryList,
    isHistoryInitialized,
    handleSearchWeather,
    handleDeleteWeatherHistory,
  };
};

export default useWeatherData;
