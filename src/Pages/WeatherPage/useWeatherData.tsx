import { useState, useEffect, useRef } from "react";
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
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchWeatherHistory = () => {
    const history = getWeatherHistory();
    setWeatherHistoryList(history);
    return history;
  };

  const handleSearch = async (
    city: string,
    country: string,
    skipSaveHistory?: boolean,
  ) => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();

    if (!trimmedCity) return;

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await getCurrentWeather(trimmedCity, trimmedCountry);
      setWeatherData(result);
      if (!skipSaveHistory) {
        addWeatherHistory(result);
        fetchWeatherHistory();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteWeatherHistory(id);
    fetchWeatherHistory();
  };

  useEffect(() => {
    /*
     * Initialize the weather data by fetching the latest search history
     * and performing a search for the latest location.
     * if there is no latest location, then perform a search for Johor Bahru, Malaysia.
     */
    function init() {
          const history = fetchWeatherHistory();
    const latestLocation = history[0]?.location;

    const [city = "Johor Bahru", country = "Malaysia"] =
      latestLocation?.split(",") ?? [];

    handleSearch(city, country, true);
    setIsInitialized(true);
    }
    init();
  }, []);

  return {
    loading,
    weatherData,
    error,
    weatherHistoryList,
    handleSearch,
    handleDelete,
    isInitialized,
  };
};

export default useWeatherData;
