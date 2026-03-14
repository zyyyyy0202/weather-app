import { useState } from "react";

import SearchForm from "../../Component/SearchForm";
import WeatherCard from "../../Component/WeatherCard";
import SearchHistory from "../../Component/SearchHistory";
import Switch from "../../Component/Switch";
import useWeatherData from "./useWeatherData";

import styles from "./index.module.less";

function WeatherPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    weatherData,
    error,
    handleSearch,
    handleDelete,
    loading,
    weatherHistoryList,
  } = useWeatherData();

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
          loading={loading}
          onSearch={handleSearch}
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
          <SearchHistory
            weatherHistoryList={weatherHistoryList}
            onDelete={handleDelete}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
