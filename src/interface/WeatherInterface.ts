export interface WeatherDataVO {
  temperature: number;
  location: string;
  lowestTemperature: number;
  highestTemperature: number;
  formattedTime: string;
  humidity: number;
  weatherType: string;
}

export interface WeatherResponse {
  name: string;
  dt: number;
  timezone: number;
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  coord: {
    lon: number;
    lat: number;
  };
}