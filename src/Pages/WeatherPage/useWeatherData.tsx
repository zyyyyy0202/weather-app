import { useState, useEffect } from "react";
import type { WeatherDataVO } from "../../interface/WeatherInterface";
import { getCurrentWeather, addWeatherHistory, getWeatherHistory, deleteWeatherHistory } from "../../services/weather";

export const useWeatherData = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataVO | null>(null);
  const [weatherHistoryList, setWeatherHistoryList] = useState<WeatherDataVO[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherHistory = async () => {
    const history = await getWeatherHistory();
    setWeatherHistoryList(history);
  }

  const handleSearch = async (city: string, country: string) => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();
    if (!trimmedCity) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getCurrentWeather(trimmedCity, trimmedCountry);
      setWeatherData(result);
      addWeatherHistory(result);
      fetchWeatherHistory();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally { 
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteWeatherHistory(id);
    fetchWeatherHistory();
  }

  useEffect(() => {
    fetchWeatherHistory();
  }, []);

  return {
    loading,
    weatherData,
    error,
    weatherHistoryList,
    handleSearch,
    handleDelete,
  }
}

export default useWeatherData;