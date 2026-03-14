import { useState } from "react";
import SearchForm from "../../Component/SearchForm";
import WeatherCard from "../../Component/WeatherCard";
import SearchHistory from "../../Component/SearchHistory";
import Switch from "../../Component/Switch";
import styles from "./index.module.less";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = async () => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();

    if (!trimmedCity || !trimmedCountry) {
      return;
    }

    try {
      setLoading(true);
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
        <div className={styles.weatherInfoContainer}>
          <div className={styles.weatherIcon}></div>
          <WeatherCard
            title={`Today's Weather`}
            temperature={26}
            location={`Johor, MY`}
            lowestTemperature={20}
            highestTemperature={30}
            formattedTime={'01-09-2022 09:41am'}
            humidity={70}
            weatherType={'Clouds'}
          />
          <SearchHistory />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
