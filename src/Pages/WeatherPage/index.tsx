import classNames from "classnames";
import SearchForm from "../../Component/SearchForm";
import WeatherCard from "../../Component/WeatherCard";
import SearchHistory from "../../Component/SearchHistory";
import Switch from "../../Component/Switch";
import useWeatherData from "./useWeatherData";
import useTheme from "../../hooks/useTheme";
import styles from "./index.module.less";

function WeatherPage() {
  const { isDarkMode, onChangeThemeMode } = useTheme();
  const {
    loading,
    weatherData,
    error,
    weatherHistoryList,
    isHistoryInitialized,
    handleSearchWeather,
    handleDeleteWeatherHistory,
  } = useWeatherData();

  const themePreferenceText = isDarkMode ? "Dark Mode" : "Light Mode";

  return (
    <div
      className={classNames(styles.weatherPage, {
        [styles.weatherPageDark]: isDarkMode,
        [styles.weatherPageLight]: !isDarkMode,
      })}
    >
      <div className={styles.weatherPageContainer}>
        <div className={styles.weatherPageToolbar}>
          <span className={styles.themeLabel}>{themePreferenceText}</span>
          <Switch checked={isDarkMode} onChange={onChangeThemeMode} />
        </div>
        <SearchForm
          loading={loading}
          onSearch={handleSearchWeather}
        />
        <div role="alert" className={classNames(styles.errorMessage, {
          [styles.active]: error,
        })}>{error}</div>
        <div className={styles.weatherInfoContainer}>
          <WeatherCard
            title="Today's Weather"
            temperature={weatherData?.temperature}
            location={weatherData?.location}
            countryCode={weatherData?.countryCode}
            lowestTemperature={weatherData?.lowestTemperature}
            highestTemperature={weatherData?.highestTemperature}
            formattedTime={weatherData?.formattedTime}
            humidity={weatherData?.humidity}
            weatherType={weatherData?.weatherType}
          />
          <SearchHistory
            weatherHistoryList={weatherHistoryList}
            onDelete={handleDeleteWeatherHistory}
            onSearch={handleSearchWeather}
            isHistoryInitialized={isHistoryInitialized}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
