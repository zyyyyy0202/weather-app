import { useState } from "react";
import SearchForm from "../../Component/SearchForm";
import WeatherCard from "../../Component/WeatherCard";
import SearchHistory from "../../Component/SearchHistory";
import Switch from "../../Component/Switch";
import { getCurrentWeather } from "../../services/weather";
import { type WeatherDataVO } from "../../interface/WeatherInterface";
import styles from "./index.module.less";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDataVO | null>(null);
  const [error, setError] = useState<string | null>(null); // <--- 新增错误状态

  const handleSearch = async () => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();
    if (!trimmedCity && !trimmedCountry) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getCurrentWeather(trimmedCity, trimmedCountry);
      setWeatherData(result);
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

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <div
      className={`${styles.weatherPage} ${
        isDarkMode ? styles.weatherPageDark : styles.weatherPageLight
      }`}
    >
      <div className={styles.weatherPageContainer}>
        <div className={styles.weatherPageToolbar}>
          <span className={styles.themeLabel}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <Switch checked={isDarkMode} onChange={setIsDarkMode} />
        </div>
        <SearchForm
          city={city}
          country={country}
          loading={loading}
          onCityChange={setCity}
          onCountryChange={setCountry}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <div className={`${styles.errorMessage} ${error ? styles.active : ""}`}>{error}</div>
        <div className={styles.weatherInfoContainer}>
          <div className={styles.weatherIcon}></div>
          <WeatherCard
            title={`Today's Weather`}
            temperature={weatherData?.temperature || 0}
            location={weatherData?.location || ""}
            lowestTemperature={weatherData?.lowestTemperature || 0}
            highestTemperature={weatherData?.highestTemperature || 0}
            formattedTime={weatherData?.formattedTime || ""}
            humidity={weatherData?.humidity || 0}
            weatherType={weatherData?.weatherType || ""}
          />
          <SearchHistory />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
