import type { WeatherDataVO, WeatherResponse } from "../interface/WeatherInterface";

const KEY = "d52b2cc7b060c07b73fb9177207b6be0";
const WEATHER_HISTORY_KEY = "weatherHistory";
const WEATHER_HISTORY_UPDATED_EVENT = "weather-history-updated";

export const currentMapperWrapper = async (response: WeatherResponse, queryCity: string) => {
  return {
    id: `${response.id}-${new Date()}`,
    temperature: response.main.temp,
    location: queryCity,
    lowestTemperature: response.main.temp_min,
    highestTemperature: response.main.temp_max,
    formattedTime: new Date().toLocaleString(),
    humidity: response.main.humidity,
    weatherType: response.weather[0].main,
  }
}

export const getCurrentWeather: (city: string, country: string) => Promise<WeatherDataVO> = async (city: string, country: string) => {
  const queryCity = `${city}${country ? `,${country}`: ''}`;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&APPID=${KEY}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch weather");
  }

  return currentMapperWrapper(data as WeatherResponse, queryCity);
}

/**
 * use locale storage to get weather history
 * @returns weather history array
 */
export const getWeatherHistory: () => WeatherDataVO[] = () => {
  return JSON.parse(localStorage.getItem(WEATHER_HISTORY_KEY) || "[]");
}

/**
 * use locale storage to add weather history
 * @param weather weather data
 */
export const addWeatherHistory = (weather: WeatherDataVO) => {
  const history = getWeatherHistory();
  const nextHistory = [weather, ...history]
  localStorage.setItem(WEATHER_HISTORY_KEY, JSON.stringify(nextHistory));
  window.dispatchEvent(new Event(WEATHER_HISTORY_UPDATED_EVENT));
  return {
    success: true,
    message: "Add weather history success",
    id: weather.id,
  }
}

/**
 * use locale storage to delete weather history
 * @param id weather history id
 */
export const deleteWeatherHistory = (id: string) => {
  const history = getWeatherHistory();
  const newHistory = history.filter((item: WeatherDataVO) => item.id !== id);
  localStorage.setItem(WEATHER_HISTORY_KEY, JSON.stringify(newHistory));
  window.dispatchEvent(new Event(WEATHER_HISTORY_UPDATED_EVENT));
  return {
    success: true,
    message: "Delete weather history success",
    id: id,
  }
}

export { WEATHER_HISTORY_UPDATED_EVENT };
