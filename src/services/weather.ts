import dayjs from "dayjs";
import type { WeatherDataVO, WeatherResponse } from "../interface/WeatherInterface";

const KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const WEATHER_HISTORY_LOCAL_STORAGE_KEY = "weatherHistory";

export const currentMapperWrapper = async (response: WeatherResponse) => {
  return {
    id: `${response.id}-${Date.now()}`,
    temperature: response.main.temp,
    location: response.name,
    countryCode: response.sys.country,
    lowestTemperature: response.main.temp_min,
    highestTemperature: response.main.temp_max,
    formattedTime: dayjs().format("YYYY-MM-DD HH:mm a"),
    humidity: response.main.humidity,
    weatherType: response.weather[0].main,
    cod: response.cod,
  }
}

export const getCurrentWeather = async (
  city: string,
  country: string
): Promise<WeatherDataVO> => {
  let queryCity = '';
  if(city && country) {
    queryCity = `${city},${country}`;
  } else {
    queryCity = city || country;
  }
  const encodedQueryCity = encodeURIComponent(queryCity);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodedQueryCity}&units=metric&APPID=${KEY}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch weather");
  }

  return currentMapperWrapper(data as WeatherResponse);
}

/**
 * use local storage to get weather history
 */
export const getWeatherHistory = (): WeatherDataVO[] => {
  try {
    const weatherHistoryData = localStorage.getItem(WEATHER_HISTORY_LOCAL_STORAGE_KEY);
    return weatherHistoryData ? JSON.parse(weatherHistoryData) : [];
  } catch (error) {
    console.error("Failed to read weather history:", error);
    return [];
  }
};
/**
 * use locale storage to add weather history
 * for duplicate location, will replace old one and move to top
 */
export const addWeatherHistory = (weather: WeatherDataVO) => {
  try {
    const history = getWeatherHistory();

    const nextHistory = [
      weather,
      ...history.filter((item) => item.location !== weather.location),
    ];

    localStorage.setItem(WEATHER_HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(nextHistory));

    return {
      success: true,
      message: "Add weather history success",
      id: weather.id,
    };
  } catch (error) {
    console.error("Failed to add weather history:", error);

    return {
      success: false,
      message: "Failed to add weather history",
      id: weather.id,
    };
  }
};

/**
 * use locale storage to delete weather history
 */
export const deleteWeatherHistory = (id: string) => {
  try {
    const history = getWeatherHistory();
    const newHistory = history.filter((item: WeatherDataVO) => item.id !== id);
    localStorage.setItem(WEATHER_HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
    return {
      success: true,
      message: "Delete weather history success",
      id: id,
    }
  } catch (error) {
    console.error("Failed to delete weather history:", error);
    return {
      success: false,
      message: "Failed to delete weather history",
      id: id,
    } 
  }
}