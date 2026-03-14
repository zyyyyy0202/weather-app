import type { WeatherDataVO, WeatherResponse } from "../interface/WeatherInterface";

const KEY = "d52b2cc7b060c07b73fb9177207b6be0";

export const currentMapperWrapper = async (response: WeatherResponse, queryCity: string) => {
  return {
    temperature: response.main.temp,
    location: queryCity,
    lowestTemperature: response.main.temp_min,
    highestTemperature: response.main.temp_max,
    formattedTime: new Date(response.dt * 1000).toLocaleString(),
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