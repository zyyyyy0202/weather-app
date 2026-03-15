import { useState, useEffect } from "react";
import type { WeatherDataVO } from "../../interface/WeatherInterface";
import {
  getCurrentWeather,
  addWeatherHistory,
  getWeatherHistory,
  deleteWeatherHistory,
} from "../../services/weather";

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await getCurrentWeather(trimmedCity, trimmedCountry);
      setWeatherData(result);
      if (shouldSaveHistory) {
        addWeatherHistory(result);
        fetchWeatherHistory();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
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
      const latestLocation = history[0]?.location; 

      const [city = "Johor Bahru", country = "Malaysia"] =
        latestLocation?.split(",") ?? [];

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
